import { translate } from "@/locales/index";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface Props {
    data: { [key: string]: any };
}

const ExplanationResultCard = ({ data }: Props) => {
    const router = useRouter();
    const { locale } = router;
    const { subject, exam, year, paper, question, videos } = data;
    return (
        <Link
            href={`/explanations/${[exam, subject, year, paper, question].join(
                "-"
            )}`}
        >
            <a className="shadow-lg rounded-lg px-8 py-4 ring-2 ring-gray-300 flex-grow hover:shadow-xl active:bg-gray-200 hover:z-10 transition">
                <div className="text-xl font-bold">{`${translate(
                    locale,
                    `${exam}`
                )} ${translate(locale, `${subject}`)} ${translate(
                    locale,
                    `${year}`
                )} ${translate(locale, `${paper}`)} ${translate(
                    locale,
                    `${question}`
                )}`}</div>
                <div>{videos?.length} video(s)</div>
            </a>
        </Link>
    );
};

export default ExplanationResultCard;
