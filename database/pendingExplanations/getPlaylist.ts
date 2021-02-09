import PendingExplanation from "../models/PendingExplanation";

const getPlaylist = async () => {
    const result = await PendingExplanation.findOne({
        type: "playlist",
    }).exec();
    if (!result) return null;
    const { id } = result;
    return id;
};

export default getPlaylist;
