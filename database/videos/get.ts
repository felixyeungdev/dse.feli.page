import Video from "../models/Video";

const getVideo = async (id: string) => {
    const result = await Video.findOne({ id }).exec();
    if (!result) return null;
    const { uploader, uploader_id, channel_id, title, duration } = result;
    return {
        id,
        uploader,
        uploader_id,
        channel_id,
        title,
        duration,
    };
};

export default getVideo;
