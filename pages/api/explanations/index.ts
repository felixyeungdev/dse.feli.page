import monk from "monk";
import { getExplanations } from "../../../database/explanation";

export default async (req, res) => {
    const { subject, exam, year, paper, question, id } = req.query;
    const searchQuery: { [key: string]: any } = {};
    if (subject) searchQuery.subject = subject;
    if (exam) searchQuery.exam = exam;
    if (year) searchQuery.year = year;
    if (paper) searchQuery.paper = paper;
    try {
        if (question) searchQuery.question = parseInt(question);
    } catch (error) {}
    if (id) searchQuery["_id"] = id;
    const explanations = await getExplanations(searchQuery);
    res.status(200).json([...explanations]);
};
