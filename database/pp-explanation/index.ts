import { pastPaperExplanationCollection as collection } from "../mongodb";

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
    const array = result.map((doc) => doc._id);
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
            exam_year: year,
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
    exam_year,
    paper,
    question,
    vid_id,
    vid_author,
    tags,
}) {
    const result = await collection.insert({
        exam,
        subject,
        exam_year,
        paper,
        question,
        vid_id,
        vid_author,
        tags,
    });
    return result;
}
