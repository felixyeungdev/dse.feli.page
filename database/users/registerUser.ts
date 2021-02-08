import User from "@/database/models/User";
import admin from "firebase-admin";

const registerUser = async (decodedIdToken: admin.auth.DecodedIdToken) => {
    if (!decodedIdToken) return;
    const { uid, email } = decodedIdToken;
    if (await User.findOne({ uid })) return;
    const user = new User({ uid, email, accessLevel: "user" });
    try {
        await user.save();
    } catch (error) {
        console.log(error);
    }
};

export default registerUser;
