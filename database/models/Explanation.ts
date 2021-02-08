import mongoose from "mongoose";

export interface ExplanationInterface {
    subject: string;
    exam: string;
    year: string;
    paper: string;
    question: number;
    videos: Array<string>;
    slug: string;
}

const ExplanationSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: [true, "Subject Required for Explanations"],
    },
    exam: {
        type: String,
        required: [true, "Exam Required for Explanations"],
    },
    year: {
        type: String,
        required: [true, "Year Required for Explanations"],
    },
    paper: {
        type: String,
        required: [true, "Paper Required for Explanations"],
    },
    question: {
        type: Number,
        required: [true, "Question Required for Explanations"],
    },
    slug: {
        type: String,
        required: [
            true,
            "A Slug Required for Explanations `EXAM SUBJECT YEAR PAPER QUESTION`",
        ],
    },
    videos: {
        type: Array,
    },
});
ExplanationSchema.index({
    slug: "text",
});

export default mongoose.models.Explanation ||
    mongoose.model("Explanation", ExplanationSchema);
