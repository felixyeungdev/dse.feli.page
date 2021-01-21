import { explanationsCollection } from "../mongodb";
import { Explanation } from "../schema/explanation";

export class ExplanationSearch {
    private static async simpleSearch(
        search: {},
        query: string
    ): Promise<string[]> {
        const result = await explanationsCollection.aggregate([
            { $match: { ...search } },
            {
                $group: {
                    _id: `$${query}`,
                    count: {
                        $sum: {
                            $size: "$videos",
                        },
                    },
                },
            },
        ]);
        const array = result
            .map((doc) => ({ id: doc._id, count: doc.count }))
            .sort()
            .reverse();
        return array;
    }

    static async getSubjects() {
        return await this.simpleSearch({}, "subject");
    }
    static async getExams(subject: string) {
        return await this.simpleSearch({ subject }, "exam");
    }
    static async getYears(subject: string, exam: string) {
        return await this.simpleSearch({ subject, exam }, "year");
    }
}

async function getAllExplanations(): Promise<Explanation[]> {
    const result = await explanationsCollection.find(
        {},
        {
            sort: {
                subject: 1,
                exam: 1,
                year: -1,
                paper: 1,
                question: 1,
            },
        }
    );
    const explanations = [];
    result.forEach((data) => {
        const { subject, exam, year, videos, paper, question, _id } = data;
        const id = _id.toString();
        explanations.push({
            subject,
            exam,
            year,
            videos,
            paper,
            question,
            id,
        });
    });
    return explanations;
}

export { getAllExplanations };
