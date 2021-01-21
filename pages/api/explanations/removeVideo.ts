import { NextApiRequest, NextApiResponse } from "next";
import { removeVideoFromExplanation } from "../../../database/explanation";
import Users from "../../../database/users";
import authUser from "../../../helpers/authUser";
import parseIdTokenFromCookie from "../../../helpers/parseIdTokenFromCookie";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const idToken = parseIdTokenFromCookie(req);
    if (!idToken) {
        res.status(400).json({
            error: "not_allowed",
        });
        return;
    }
    const currentUser = await authUser(idToken);
    if (!currentUser) {
        res.status(400).json({
            error: "token_expired",
        });
        return;
    }
    const adminRights = await Users.checkPermission(currentUser);
    if (!adminRights) {
        res.status(400).json({
            error: "unauthorised",
        });
        return;
    }
    const { id } = req.query;
    const { videoId } = req.body;
    const result = await removeVideoFromExplanation(id as string, videoId);
    res.json({ result });
};
