import dbConnect from "@/database/index";
import PendingExplanation from "../models/PendingExplanation";

interface IAddPending {
    id: string;
    type: string;
}

const addPending = async ({ type, id }: IAddPending) => {
    await dbConnect();
    const newPending = new PendingExplanation({ type, id });
    await newPending.save();
    return id;
};

export default addPending;
