import Explanation from "../models/Explanation";

const removeVideoFromExplanation = async (id: string, videoId: string) => {
    const result = await Explanation.updateOne(
        {
            _id: id,
        },
        {
            // @ts-ignore
            $pull: { videos: videoId },
        }
    ).exec();
    return result;
};

export default removeVideoFromExplanation;
