import { startBackgroundJobs } from "../../../background";

export default async (_req, res) => {
    startBackgroundJobs();
    res.status(200).json({ success: true });
};
