import { addVideoToDatabase, getVideoFromDatabase } from "../database/video";
import { pendingExplanationsCollection } from "../database/mongodb";
import { videoSchema } from "../database/schema/video";
import sleep from "../utils/sleep";
import { getYouTubeInfo } from "../youtube";
import fetch from "node-fetch";

function parseDuration(duration: string): number {
    var total = 0;
    const [seconds, minutes, hours] = duration.split(":").reverse();
    seconds && (total += parseInt(seconds));
    minutes && (total += parseInt(minutes) * 60);
    hours && (total += parseInt(hours) * 60 * 24);
    return total;
}

class PendingExplanation {
    state: {
        started: boolean;
        id?: number;
    };
    constructor() {
        this.state = {
            started: false,
        };
    }

    public async start() {
        if (this.state.started) return;
        this.state.id = Math.random();
        console.log("starting pending explanation background task");
        this.state = {
            ...this.state,
            started: true,
        };
        this.startProcess();
    }

    private async startProcess(once = false) {
        var check = true;
        while (check) {
            await this.publishPlayLists();
            await this.publishVideos();
            await sleep(5000);
            if (once) check = false;
        }
    }

    private async publishPlayLists() {
        const result = await pendingExplanationsCollection.find({
            type: "playlist",
        });
        const ids = await result.map((doc) => doc.id);
        const playlistIds = [];
        for (var i in ids) {
            playlistIds.push(ids[i]);
        }
        for (var playlist of playlistIds) {
            try {
                const response = await fetch(
                    `https://alltubedownload.net/json?url=https://www.youtube.com/playlist?list=${playlist}`
                );
                const json = await response.json();
                const entries = json.entries.map((entry) => ({
                    id: entry.id,
                    type: "video",
                }));
                console.log(entries);
                await pendingExplanationsCollection.insert(entries);
                await pendingExplanationsCollection.remove({
                    id: playlist,
                });
            } catch (error) {
                console.log(`Error while fetching ${playlist} ${error}`);
            }
        }
    }
    private async publishVideos() {
        const result = await pendingExplanationsCollection.find({
            type: "video",
        });
        const ids = result.map((doc) => doc.id);
        const videoIds = [];
        for (var i in ids) {
            videoIds.push(ids[i]);
        }
        for (var video of videoIds) {
            try {
                if (!(await getVideoFromDatabase(video))) {
                    const data: { [key: string]: any } = await getYouTubeInfo(
                        video
                    );
                    const {
                        id,
                        uploader,
                        uploader_id,
                        channel_id,
                        title,
                        duration: durationStr,
                    } = data;

                    const duration = parseDuration(durationStr);
                    const result = await videoSchema.validateAsync({
                        id,
                        uploader,
                        uploader_id,
                        channel_id,
                        title,
                        duration,
                        referenced: false,
                    });
                    await addVideoToDatabase(result);
                }
            } catch (error) {
                console.log(`Error while fetching ${video} ${error}`);
            }
            await pendingExplanationsCollection.remove({
                id: video,
            });
        }
    }
}

const pendingExplanation = new PendingExplanation();

export { pendingExplanation };
