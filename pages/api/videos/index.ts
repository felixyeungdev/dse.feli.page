import searchVideo from "@/database/videos/search";

//     const video = await getVideoFromDatabase(id);
//     if (video) {
//         res.status(200).json([video]);
//         return;
//     } else {
//         // const results = await searchVideoFromDatabase(query || "", 3);
//         const results = await searchVideo(query || "", 3);
//         res.status(200).json(results);
//     }
// };

import { APIError, onError, onNoMatch } from "../_handlers";
import dbConnect from "@/database/index";
import authMiddleware from "@/firebase/server/authMiddleware";
import nextConnect from "next-connect";
import {
    NextApiRequestWithAuth,
    NextApiResponseWithAuth,
} from "@/firebase/server/authMiddleware";
import getVideo from "@/database/videos/get";

const handler = nextConnect<NextApiRequestWithAuth, NextApiResponseWithAuth>({
    onNoMatch,
    onError,
})
    .use(authMiddleware({ whitelistMethods: ["GET"] }))
    .get(async (req, res) => {
        const { id, query } = req.query;

        if (!id && !query)
            throw new APIError({
                status: 400,
                message: "requires either id or query",
            });

        await dbConnect();

        const video = await getVideo(`${id}`);
        if (video) {
            res.json([video]);
        } else {
            const results = await searchVideo(query.toString() ?? "", 3);
            res.json(results);
        }
    });

export default handler;
