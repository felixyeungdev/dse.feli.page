import PendingExplanation from "../models/PendingExplanation";

const removePending = async (id: string) => {
    await PendingExplanation.findOneAndDelete({ id }).exec();
};

export { removePending };
