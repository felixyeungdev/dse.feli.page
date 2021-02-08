import mongoose from "mongoose";

export interface PendingExplanationInterface {
    type: string;
    id: string;
}

const PendingExplanationSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, "Type Required for PendingExplanations"],
    },
    id: {
        type: String,
        required: [true, "Type ID Required for PendingExplanations"],
    },
});

export default mongoose.models.PendingExplanation ||
    mongoose.model("PendingExplanation", PendingExplanationSchema);
