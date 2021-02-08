import Explanation from "../models/Explanation";

const addVideoToExplanation = async (id: string, videoId: string) => {
    const result = await Explanation.updateOne(
        {
            _id: id,
        },
        {
            // @ts-ignore
            $addToSet: { videos: videoId },
        }
    ).exec();
    return result;
};

export default addVideoToExplanation;
