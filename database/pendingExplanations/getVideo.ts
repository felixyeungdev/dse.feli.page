import PendingExplanation from "../models/PendingExplanation";

const getVideo = async () => {
    const result = await PendingExplanation.findOne({
        type: "video",
    }).exec();
    if (!result) return null;
    const { id } = result;
    return id;
};

export default getVideo;
