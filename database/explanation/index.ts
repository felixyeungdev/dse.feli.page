import { explanationsCollection } from "../mongodb";
import { Explanation } from "../schema/explanation";

const subjectSortingWeight = {
    CHI: 1,
    ENG: 2,
    MAT: 3,
    LS: 4,
    PHY: 5,
    CHEM: 6,
    BIO: 7,
    ECON: 8,
    ICT: 9,
    M1: 10,
    M2: 11,
    default: 999,
};

export class ExplanationSearch {
    private static async simpleSearch(
        search: {},
        query: string
    ): Promise<any[]> {
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
        const subjects = await this.simpleSearch({}, "subject");
        const sorted = subjects.sort(function (a, b) {
            return (
                (subjectSortingWeight[a.id] || subjectSortingWeight.default) -
                (subjectSortingWeight[b.id] || subjectSortingWeight.default)
            );
        });
        return sorted;
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
    static async get({ subject, exam, year, paper }, key: string) {
        return await this.simpleSearch(
            {
                subject,
                exam,
                year,
                paper,
            },
            key
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
