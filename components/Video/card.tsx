import { useRouter } from "next/router";
import React from "react";
import YouTube from "react-youtube";
import LinkButton from "../Button/Link";

const VideoCard = ({ data }) => {
    const router = useRouter();
    const { locale } = router;
    return (
        <div className="bg-white mb-4 rounded-lg shadow-xl overflow-hidden">
            <div className="flex justify-between items-center mx-4">
                <div className="min-h-56 flex items-center text-xl">
                    {data.uploader}
                </div>
                <div>
                    <LinkButton
                        href={`http://youtu.be/${data.id}`}
                        locale={locale}
                    >
                        <span className="hidden md:inline">Open in </span>
                        YouTube
                    </LinkButton>
                </div>
            </div>
            <div className="overflow-hidden">
                <YouTube
                    videoId={data.id}
                    opts={{
                        height: "390",
                        width: "100%",
                    }}
                />
            </div>
        </div>
    );
};

export default VideoCard;
