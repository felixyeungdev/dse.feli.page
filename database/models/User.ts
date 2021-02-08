import mongoose from "mongoose";

export interface UserInterface {
    uid: string;
    accessLevel: string;
    email: string;
}

const UserSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: [true, "ID Required for Users"],
        unique: true,
    },
    accessLevel: {
        type: String,
        required: [true, "Access Level Required"],
    },
    email: {
        type: String,
        required: [true, "Email Required for Users"],
    },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
