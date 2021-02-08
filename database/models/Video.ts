import mongoose from "mongoose";

export interface VideoInterface {
    id: string;
    uploader: string;
    uploader_id: string;
    channel_id: string;
    title: string;
    duration: number;
    referenced: boolean;
}

const VideoSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, "Video ID Required"],
        unique: true,
    },
    uploader: {
        type: String,
        required: [true, "Video Uploader Required"],
    },
    uploader_id: {
        type: String,
        required: [true, "Video Uploader ID Required"],
    },
    channel_id: {
        type: String,
        required: [true, "Video Channel ID Required"],
    },
    title: {
        type: String,
        required: [true, "Video Title Required"],
    },
    duration: {
        type: Number,
        required: [true, "Video Duration Required"],
    },
    referenced: {
        type: Boolean,
        required: [true, "Video Referenced Required"],
    },
});

VideoSchema.index({ uploader: "text", title: "text" });

export default mongoose.models.Video || mongoose.model("Video", VideoSchema);
