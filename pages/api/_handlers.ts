import { NextApiRequest, NextApiResponse } from "next";

interface APIErrorConstructor {
    status: number;
    message: string;
}
class APIError extends Error {
    status: number;
    constructor({ status, message }: APIErrorConstructor) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.status = status;
    }
}

const onNoMatch = (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    res.status(404).send({
        error: true,
        message: `Method ${method} not allowed`,
        method: method,
    });
};

const onError = (
    error: APIError,
    _req: NextApiRequest,
    res: NextApiResponse
) => {
    var status: number = 500;
    if (error instanceof APIError) status = error.status;

    res.status(status).send({
        error: true,
        success: false,
        message: error.message,
    });
};

export { onNoMatch, onError, APIError };
