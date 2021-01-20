import { search } from "../../database/pp-explanation";

export default async (req, res) => {
    const { query } = req.query;
    const result = await search(query);
    res.status(201).json({
        result,
    });
};
