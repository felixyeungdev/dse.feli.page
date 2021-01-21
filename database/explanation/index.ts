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
            {
                $sort: {
                    _id: 1,
                },
            },
        ]);
        const array = result.map((doc) => ({ id: doc._id, count: doc.count }));
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
    static async getPapers(subject: string, exam: string, year: string) {
        return await this.simpleSearch({ subject, exam, year }, "paper");
    }
    static async getQuestions(
        subject: string,
        exam: string,
        year: string,
        paper: string
    ) {
        return await this.simpleSearch(
            { subject, exam, year, paper },
            "question"
        );
    }
}

async function getExplanations(searchQuery: {
    [key: string]: any;
}): Promise<Explanation[]> {
    const result = await explanationsCollection.find(searchQuery, {
        sort: {
            subject: 1,
            exam: 1,
            year: -1,
            paper: 1,
            question: 1,
        },
    });
    const explanations = [];
    result.forEach((data) => {
        const { subject, exam, year, videos, paper, question, _id } = data;
        const id = _id.toString();
        explanations.push({
            id,
            subject,
            exam,
            year,
            paper,
            question,
            videos,
        });
    });

    return explanations;
}

export async function addVideoToExplanation(id: string, videoId: string) {
    const result = await explanationsCollection.update(
        {
            _id: id,
        },
        {
            $addToSet: {
                videos: videoId,
            },
        }
    );
    return result;
}

export async function removeVideoFromExplanation(id: string, videoId: string) {
    const result = await explanationsCollection.update(
        {
            _id: id,
        },
        {
            $pull: {
                videos: videoId,
            },
        }
    );
    return result;
}

export { getExplanations };
