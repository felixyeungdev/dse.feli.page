import { explanationsCollection } from "../mongodb";
import { Explanation } from "../schema/explanation";

async function getAllExplanations(): Promise<Explanation[]> {
    const result = await explanationsCollection.find({});
    const explanations = [];
    result.forEach((data) => {
        const { subject, exam, year, videos, paper, question } = data;
        explanations.push({ subject, exam, year, videos, paper, question });
    });
    console.log(explanations);
    return explanations;
}

export { getAllExplanations };
