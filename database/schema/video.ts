import Joi from "joi";

export interface Video {
    id: string;
    uploader: string;
    uploader_id: string;
    channel_id: string;
    title: string;
    duration: number;
    referenced: boolean;
}

const videoSchema = Joi.object({
    id: Joi.string().trim().length(11).required(),
    uploader: Joi.string().required(),
    uploader_id: Joi.string().required(),
    channel_id: Joi.string().required(),
    title: Joi.string(),
    duration: Joi.number().positive().required(),
    referenced: Joi.boolean().required(),
});

export { videoSchema };
