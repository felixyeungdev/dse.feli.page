import { onError, onNoMatch } from "../_handlers";
import dbConnect from "@/database/index";
import authMiddleware from "@/firebase/server/authMiddleware";
import nextConnect from "next-connect";
import {
    NextApiRequestWithAuth,
    NextApiResponseWithAuth,
} from "@/firebase/server/authMiddleware";
import searchExplanations from "@/database/explanations/search";

const handler = nextConnect<NextApiRequestWithAuth, NextApiResponseWithAuth>({
    onNoMatch,
    onError,
})
    .use(authMiddleware({ whitelistMethods: ["GET"] }))
    .get(async (req, res) => {
        await dbConnect();

        const result = await searchExplanations({}, null);

        res.send(result);
    });

export default handler;
