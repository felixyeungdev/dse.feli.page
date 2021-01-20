import { videosCollection } from "../mongodb";
import { Video } from "../schema/video";

async function addVideoToDatabase(video: Video) {
    const checkExist = await videosCollection.findOne({
        id: video.id,
    });
    if (checkExist) {
        await videosCollection.findOneAndUpdate(
            { id: video.id },
            { $set: { ...video } }
        );
    } else {
        await videosCollection.insert({
            ...video,
        });
    }
}

async function getVideoFromDatabase(videoId: string) {
    const result = await videosCollection.findOne({ id: videoId });
    if (!result) return null;
    const { id, uploader, uploader_id, channel_id, title, duration } = result;
    return {
        id,
        uploader,
        uploader_id,
        channel_id,
        title,
        duration,
    };
}

async function getPendingVideoFromDatabase() {
    const result = await videosCollection.findOne({ referenced: false });
    if (!result) return null;
    const {
        id,
        uploader,
        uploader_id,
        channel_id,
        title,
        duration,
        referenced,
    } = result;
    return {
        id,
        uploader,
        uploader_id,
        channel_id,
        title,
        duration,
        referenced,
    };
}

export {
    addVideoToDatabase,
    getVideoFromDatabase,
    getPendingVideoFromDatabase,
};
