import { ExplanationInterface } from "./../models/Explanation";
import Explanation from "../models/Explanation";

const searchExplanations = async (
    query: object,
    limit: number = 100
): Promise<ExplanationInterface[]> => {
    const result = await Explanation.find({ ...query }, null, {
        sort: {
            subject: 1,
            exam: 1,
            year: -1,
            paper: 1,
            question: 1,
        },
        limit: limit,
    }).exec();

    return result.map((data) => {
        const {
            subject,
            exam,
            year,
            videos,
            paper,
            question,
            _id,
            slug,
        } = data;
        const id = _id.toString();
        return {
            id,
            subject,
            exam,
            year,
            videos,
            paper,
            question,
            slug,
        };
    });
};

export default searchExplanations;
