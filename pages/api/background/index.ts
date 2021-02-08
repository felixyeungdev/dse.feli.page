import { startBackgroundJobs } from "../../../background";

export default async (req, res) => {
    startBackgroundJobs();
    res.status(200).json({ success: true });
};
