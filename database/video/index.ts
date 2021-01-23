import { DBCollections } from "./../mongodb";
import { connectToDatabase, videosCollection } from "../mongodb";
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

async function searchVideoFromDatabase(query: string, limit: number) {
    const { db } = await connectToDatabase();
    await db.collection(DBCollections.videos).createIndex({
        uploader: "text",
        title: "text",
    });
    const data = await db
        .collection(DBCollections.videos)
        .find(
            {
                $text: {
                    $search: query,
                },
            },
            // @ts-ignore
            { score: { $meta: "textScore" } }
        )
        .sort({ score: { $meta: "textScore" } })
        .project({
            score: {
                $meta: "textScore",
            },
        })
        .limit(limit)
        .toArray();
    const videos = data.map((video) => {
        const duration = JSON.parse(JSON.stringify(video.duration));
        console.log(video);
        return {
            id: video.id,
            uploader: video.uploader,
            uploader_id: video.uploader_id,
            channel_id: video.channel_id,
            title: video.title,
            duration: duration,
            score: video.score,
        };
    });
    return videos;
}

export {
    addVideoToDatabase,
    getVideoFromDatabase,
    getPendingVideoFromDatabase,
    searchVideoFromDatabase,
};
