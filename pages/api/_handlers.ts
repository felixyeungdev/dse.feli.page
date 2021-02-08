import { NextApiRequest, NextApiResponse } from "next";

const onNoMatch = (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    res.status(404).send({
        error: true,
        message: `Method ${method} not allowed`,
        method: method,
    });
};

const onError = (error: Error, _req: NextApiRequest, res: NextApiResponse) => {
    res.status(400).send({
        error: true,
        message: error.message,
    });
};

export { onNoMatch, onError };
