import sleep from "../utils/sleep";
import fetch from "node-fetch";
import getPlaylist from "@/database/pendingExplanations/getPlaylist";
import PendingExplanation from "@/database/models/PendingExplanation";
import dbConnect from "../database";
import { removePending } from "@/database/pendingExplanations/remove";
import getVideo from "@/database/pendingExplanations/getVideo";
import addVideo from "@/database/videos/add";

const globalAny: any = global;
let cached: {
    started?: boolean;
} = globalAny.mongo;
if (!cached) cached = globalAny.pendingExplanations = {};

class PendingExplanationBackground {
    constructor() {
        cached.started = false;
    }

    public async start() {
        if (cached.started) return;
        console.log("starting pending explanation background task");
        cached.started = true;
        this.startProcess(true);
    }

    private async startProcess(once = false) {
        var check = true;
        await dbConnect();
        while (check) {
            await this.publishPlayLists();
            await this.publishVideos();
            await sleep(5000);
            if (once) check = false;
        }
    }

    private async publishPlayLists() {
        var current = await getPlaylist();
        while (current) {
            const response = await fetch(
                `https://alltubedownload.net/json?url=https://www.youtube.com/playlist?list=${current}`
            );
            const json = await response.json();
            const entries = json.entries.map((entry) => ({
                id: entry.id,
                type: "video",
            }));
            await PendingExplanation.insertMany(entries);
            await removePending(current);
            current = await getPlaylist();
        }
    }
    private async publishVideos() {
        var current = await getVideo();
        while (current) {
            try {
                const response = await fetch(
                    `https://alltubedownload.net/json?url=https://www.youtube.com/watch?v=${current}`
                );
                const data = await response.json();
                const {
                    id,
                    uploader,
                    uploader_id,
                    channel_id,
                    title,
                    duration,
                } = data;
                await addVideo({
                    id,
                    uploader,
                    uploader_id,
                    channel_id,
                    title,
                    duration,
                    referenced: false,
                });
            } catch (error) {
                console.log(error);
            }
            current = await getVideo();
            await removePending(current);
        }
    }
}

const pendingExplanationBackground = new PendingExplanationBackground();

export { pendingExplanationBackground };
