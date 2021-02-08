import Link from "next/link";
import React from "react";
import YouTube from "react-youtube";

interface Props {
    data: { [key: string]: any };
}

const ExplanationResultCard = ({ data }) => {
    const { subject, exam, year, paper, question, videos } = data;
    return (
        <Link
            href={`/explanations/${[exam, subject, year, paper, question].join(
                "-"
            )}`}
        >
            <a className="shadow-lg rounded-lg px-8 py-4 ring-2 ring-gray-300 flex-grow hover:shadow-xl active:bg-gray-200 hover:z-10 transition">
                <div className="text-xl font-bold">{`${exam} ${subject} ${year} ${paper} ${question}`}</div>
                <div>{videos?.length} video(s)</div>
            </a>
        </Link>
    );
};

export default ExplanationResultCard;
