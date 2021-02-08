import { onError, onNoMatch } from "../_handlers";
import simpleSearch from "@/database/explanations/simpleSearch";
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
    .get(async (req, res) => {
        const { subject, exam, year, paper, question, slug, key } = req.query;

        if (!key) throw new Error("key is required");

        const query: { [key: string]: string | number } = {};

        if (subject) query.subject = subject.toString();
        if (exam) query.exam = exam.toString();
        if (year) query.year = year.toString();
        if (paper) query.paper = paper.toString();
        if (question) query.question = parseFloat(question.toString());
        if (slug) query.slug = slug.toString();

        await dbConnect();

        const result = await simpleSearch(query, key.toString());

        res.send(result);
    });

export default handler;
