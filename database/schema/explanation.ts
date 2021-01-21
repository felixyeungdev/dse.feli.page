import Joi from "joi";

export interface Explanation {
    subject: string;
    exam: string;
    year: string;
    paper: string;
    question: number;
    videos: string[];
}

const explanationSchema = Joi.object({
    subject: Joi.string().trim().required(),
    exam: Joi.string().trim().required(),
    year: Joi.string().trim().required(),
    paper: Joi.string(),
    question: Joi.number(),
    videos: Joi.array(),
});

export { explanationSchema };
