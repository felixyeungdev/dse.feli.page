import Explanation from "../models/Explanation";

interface SimpleSearchResult {
    id: string;
    count: number;
}

const simpleSearch = async (
    query: object,
    key: string
): Promise<SimpleSearchResult[]> => {
    const result = await Explanation.aggregate([
        { $match: { ...query } },
        {
            $group: {
                _id: `$${key}`,
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
    ]).exec();
    const array = result.map((doc) => ({
        id: doc._id?.toString(),
        count: doc.count,
    }));
    return array;
};

export default simpleSearch;
