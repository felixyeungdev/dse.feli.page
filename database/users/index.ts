import admin from "firebase-admin";
import { usersCollection as users } from "../mongodb";

export default class Users {
    static async saveNewUser(user: admin.auth.DecodedIdToken) {
        const { uid } = user;
        await users.insert({ uid, admin: false, email: user.email });
    }

    static async checkPermission(user: admin.auth.DecodedIdToken) {
        const { uid } = user;
        const match = await users.findOne({ uid });
        if (match) {
            if (match.admin) {
                return true;
            }
        } else {
            await this.saveNewUser(user);
        }
        return false;
    }
}
