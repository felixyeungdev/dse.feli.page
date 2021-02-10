import PendingExplanation from "../models/PendingExplanation";

const getPending = async () => {
    const result = await PendingExplanation.find().exec();
    return result.map((datum) => {
        return {
            id: datum.id,
            type: datum.type,
        };
    });
};

export default getPending;
