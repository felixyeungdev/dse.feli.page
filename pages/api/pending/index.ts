import { onError, onNoMatch } from "../_handlers";
import authMiddleware from "@/firebase/server/authMiddleware";
import nextConnect from "next-connect";
import {
    NextApiRequestWithAuth,
    NextApiResponseWithAuth,
} from "@/firebase/server/authMiddleware";
import { AccessLevel } from "@/config/accessLevels";
import getPending from "@/database/pendingExplanations/get";

const handler = nextConnect<NextApiRequestWithAuth, NextApiResponseWithAuth>({
    onNoMatch,
    onError,
})
    .use(
        authMiddleware({
            requiredAccessLevel: AccessLevel.Contributor,
        })
    )
    .get(async (_req, res) => {
        const result = await getPending();

        res.send([...result]);
    });

export default handler;
