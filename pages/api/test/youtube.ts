import { getYouTubeInfo } from "../../../youtube";

export default async (req, res) => {
    const { url } = req.query;
    try {
        const result = await getYouTubeInfo(url);
        res.status(200).json({ result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
};
