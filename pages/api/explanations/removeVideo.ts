import { AccessLevel } from "@/config/accessLevels";
import { onError, onNoMatch } from "../_handlers";
import removeVideoFromExplanation from "@/database/explanations/removeVideo";
import dbConnect from "@/database/index";
import authMiddleware from "@/firebase/server/authMiddleware";
import nextConnect from "next-connect";
import {
    NextApiRequestWithAuth,
    NextApiResponseWithAuth,
} from "@/firebase/server/authMiddleware";

const handler = nextConnect<NextApiRequestWithAuth, NextApiResponseWithAuth>({
    onNoMatch,
    onError,
})
    .use(
        authMiddleware({
            requiredAccessLevel: AccessLevel.Contributor,
        })
    )
    .delete(async (req, res) => {
        const { id } = req.query;
        const { videoId } = req.body;

        await dbConnect();

        await removeVideoFromExplanation(id.toString(), videoId);

        res.send({ success: true });
    });

export default handler;
