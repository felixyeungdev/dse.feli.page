import { getVideoFromDatabase } from "../../../database/video";

export default async (req, res) => {
    const { id } = req.query;
    const video = await getVideoFromDatabase(id);
    res.status(201).json({
        video,
    });
};
