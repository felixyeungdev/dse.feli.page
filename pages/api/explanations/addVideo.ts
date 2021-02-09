import { onError, onNoMatch } from "../_handlers";
import addVideoToExplanation from "@/database/explanations/addVideo";
import dbConnect from "@/database/index";
import authMiddleware from "@/firebase/server/authMiddleware";
import nextConnect from "next-connect";
import {
    NextApiRequestWithAuth,
    NextApiResponseWithAuth,
} from "@/firebase/server/authMiddleware";
import { AccessLevel } from "@/config/accessLevels";

const handler = nextConnect<NextApiRequestWithAuth, NextApiResponseWithAuth>({
    onNoMatch,
    onError,
})
    .use(authMiddleware({ requiredAccessLevel: AccessLevel.Contributor }))
    .post(async (req, res) => {
        const { id } = req.query;
        const { videoId } = req.body;

        await dbConnect();

        const result = await addVideoToExplanation(id.toString(), videoId);

        res.send({ success: true });
    });

export default handler;
