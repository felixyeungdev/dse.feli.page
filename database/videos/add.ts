import Video, { VideoInterface } from "../models/Video";

const addVideo = async (video: VideoInterface) => {
    const result = await Video.findOne({ id: video.id }).exec();
    if (result) {
        Video.updateOne(
            { id: video.id },
            {
                $set: { ...video },
            }
        );
    } else {
        const newVideo = new Video({
            ...video,
        });
        await newVideo.save();
    }
};

export default addVideo;
