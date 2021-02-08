import searchVideo from "@/database/videos/search";
import {
    getVideoFromDatabase,
    searchVideoFromDatabase,
} from "../../../database/video";

export default async (req, res) => {
    const { id, query } = req.query;
    if (!id && !query) {
        res.status(400).json({
            error: "invalid_search",
        });
        return;
    }
    const video = await getVideoFromDatabase(id);
    if (video) {
        res.status(200).json([video]);
        return;
    } else {
        // const results = await searchVideoFromDatabase(query || "", 3);
        const results = await searchVideo(query || "", 3);
        res.status(200).json(results);
    }
};
