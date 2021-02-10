import { onError, onNoMatch } from "../_handlers";
import authMiddleware from "@/firebase/server/authMiddleware";
import nextConnect from "next-connect";
import {
    NextApiRequestWithAuth,
    NextApiResponseWithAuth,
} from "@/firebase/server/authMiddleware";
import { AccessLevel } from "@/config/accessLevels";
import { startBackgroundJobs } from "background";

const handler = nextConnect<NextApiRequestWithAuth, NextApiResponseWithAuth>({
    onNoMatch,
    onError,
})
    .use(authMiddleware({ requiredAccessLevel: AccessLevel.Admin }))
    .post(async (_req, res) => {
        startBackgroundJobs();

        res.send({ success: true });
    });

export default handler;
