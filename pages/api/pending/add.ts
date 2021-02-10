import { APIError } from "pages/api/_handlers";
import { onError, onNoMatch } from "../_handlers";
import dbConnect from "@/database/index";
import authMiddleware from "@/firebase/server/authMiddleware";
import nextConnect from "next-connect";
import {
    NextApiRequestWithAuth,
    NextApiResponseWithAuth,
} from "@/firebase/server/authMiddleware";
import { AccessLevel } from "@/config/accessLevels";
import addPending from "@/database/pendingExplanations/add";

const handler = nextConnect<NextApiRequestWithAuth, NextApiResponseWithAuth>({
    onNoMatch,
    onError,
})
    .use(authMiddleware({ requiredAccessLevel: AccessLevel.Contributor }))
    .post(async (req, res) => {
        const { id, type } = req.body;

        if (!id)
            throw new APIError({
                status: 400,
                message: "No ID Provided",
            });

        if (!type)
            throw new APIError({
                status: 400,
                message: "No Type Provided",
            });

        await dbConnect();

        await addPending({ id, type });

        res.send({ success: true });
    });

export default handler;
