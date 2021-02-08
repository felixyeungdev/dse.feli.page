import User from "@/database/models/User";
import accessLevels from "@/config/accessLevels";
import admin from "firebase-admin";

const getAccessLevel = async (
    decodedIdToken: admin.auth.DecodedIdToken
): Promise<string> => {
    if (!decodedIdToken) return accessLevels[0];
    const { uid } = decodedIdToken;
    const user = await User.findOne({ uid });
    if (!user) return accessLevels[0];
    return user.accessLevel ?? accessLevels[0];
};

export default getAccessLevel;
