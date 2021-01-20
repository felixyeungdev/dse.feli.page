import { getPendingVideoFromDatabase } from "../../../database/video";
import { getYouTubeInfo } from "../../../youtube";

export default async (req, res) => {
    try {
        const result = await getPendingVideoFromDatabase();
        res.status(200).json({ result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};
