import db, { pastPaperExplanationCollection as collection } from "../mongodb";

export async function simpleSearch(
    search: {},
    query: string
): Promise<string[]> {
    const result = await collection.aggregate([
        {
            $match: {
                ...search,
            },
        },
        {
            $group: {
                _id: `$${query}`,
            },
        },
    ]);
    const array = result
        .map((doc) => doc._id)
        .sort()
        .reverse();
    return array;
}

export async function findDocuments(search: {
    [key: string]: any;
}): Promise<any[]> {
    const matches = await collection.find({ ...search });
    const result = [];
    matches.forEach((match) => {
        const {
            exam,
            subject,
            year,
            paper,
            vid_id,
            vid_author,
            tags,
            question,
        } = match;
        result.push({
            id: `${exam} ${subject} ${year}/${paper}/Q${question} ${vid_id}`,
            exam,
            subject,
            year,
            paper,
            vid_id,
            vid_author,
            vid_img: `https://i.ytimg.com/vi/${vid_id}/hqdefault.jpg`,
            tags,
            question,
        });
    });
    return result;
}

export async function addNewExplanation({
    exam,
    subject,
    year,
    paper,
    question,
    vid_id,
    vid_author,
    tags,
}) {
    const result = await collection.insert({
        exam,
        subject,
        year,
        paper,
        question,
        vid_id,
        vid_author,
        tags,
    });
    return result;
}

collection.createIndex(
    {
        exam: 1,
        subject: 1,
        year: 1,
        tags: 1,
        question: 1,
        paper: 1,
    },
    {
        name: "text",
    }
);

(async () => {
    console.log(await collection.indexes());
})();

export async function search(term: string): Promise<{ [key: string]: any }> {
    const result = await collection.find(
        // {
        //     $or: [
        //         { exam: new RegExp(term, "gi") },
        //         { subject: new RegExp(term, "gi") },
        //         { year: new RegExp(term, "gi") },
        //         { paper: new RegExp(term, "gi") },
        //         { question: new RegExp(term, "gi") },
        //         { tags: new RegExp(term, "gi") },
        //     ],
        // },
        { $text: { $search: term, $caseSensitive: false } },
        { limit: 15 }
    );
    return result;
}
