import admin from "firebase-admin";

const auth = async (
    token: string
): Promise<admin.auth.DecodedIdToken | null> => {
    if (token) {
        try {
            const decodedToken = await admin.auth().verifyIdToken(token);
            return decodedToken;
        } catch (err) {
            console.log(err);
        }
    }
    return null;
};

export default auth;
