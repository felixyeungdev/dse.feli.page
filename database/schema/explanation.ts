import Joi from "joi";

export interface Explanation {
    subject: string;
    exam: string;
    year: string;
    videos: string;
    paper: string;
    question: number;
}

const explanationSchema = Joi.object({
    subject: Joi.string().trim().required(),
    exam: Joi.string().trim().required(),
    year: Joi.string().trim().required(),
    videos: Joi.array(),
    paper: Joi.string(),
    question: Joi.number(),
});

export { explanationSchema };
