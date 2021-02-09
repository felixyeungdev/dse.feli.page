import { onError, onNoMatch } from "../_handlers";
import searchExplanations from "@/database/explanations/search";
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
    .use(authMiddleware({ whitelistMethods: ["GET"] }))
    .get(async (_req, res) => {
        await dbConnect();

        const result = await searchExplanations({}, null);

        res.send(result);
    });

export default handler;
