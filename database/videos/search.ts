import Video from "../models/Video";

const searchVideo = async (query: string, limit: number) => {
    const data = await Video.find(
        {
            $text: {
                $search: query,
            },
        },
        {
            score: { $meta: "textScore" },
        }
    )
        .sort({
            score: { $meta: "textScore" },
        })
        .limit(limit)
        .exec();
    const result = data.map(
        ({
            id,
            uploader,
            uploader_id,
            channel_id,
            title,
            duration,
            referenced,
        }) => ({
            id,
            uploader,
            uploader_id,
            channel_id,
            title,
            duration,
            referenced,
        })
    );
    return result;
};

export default searchVideo;
