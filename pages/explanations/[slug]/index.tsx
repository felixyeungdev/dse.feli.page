import LinkButton from "@/components/Button/Link";
import Content from "@/components/Content";
import VideoCard from "@/components/Video/card";
import searchExplanations from "@/database/explanations/search";
import getVideo from "@/database/videos/get";
import { translate } from "@/locales/index";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";

interface Props {
    exam: string;
    subject: string;
    year: string;
    paper: string;
    question: number;
    videos: { [key: string]: any }[];
}

const ExplanationSlug = ({
    exam,
    subject,
    year,
    paper,
    question,
    videos = [],
}: Props) => {
    const router = useRouter();
    const { locale } = router;
    return (
        <Content>
            <div className="flex items-center justify-between">
                <h1>{`${translate(locale, `${exam}`)} ${translate(
                    locale,
                    `${subject}`
                )} ${translate(locale, `${year}`)} ${translate(
                    locale,
                    `${paper}`
                )} ${translate(locale, `${question}`)}`}</h1>
                <LinkButton href="/explanations" locale={locale}>
                    {translate(locale, "back")}
                </LinkButton>
            </div>
            <div className="mt-4">
                {videos.map((videoData) => {
                    return <VideoCard data={videoData} key={videoData.id} />;
                })}
                {videos?.length <= 0 && (
                    <div className="text-xl">
                        No videos found for this question
                    </div>
                )}
            </div>
        </Content>
    );
};

const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    };
};

const getStaticProps: GetStaticProps = async (context) => {
    const { slug } = context.params;
    const [exam, subject, year, paper, _question] = slug.toString().split("-");
    const question = parseFloat(_question);

    if (!question || !paper || !year || !subject || !exam)
        return { notFound: true };

    const searchResults = await searchExplanations({
        exam,
        subject,
        year,
        paper,
        question,
    });

    if (searchResults.length <= 0) return { notFound: true };

    const explanation = searchResults[0];
    const { videos } = explanation;

    const videoData: any[] = [];

    for (var video of videos) {
        videoData.push(await getVideo(video));
    }

    return {
        props: { exam, subject, year, paper, question, videos: videoData },
        notFound: !question || !paper || !year || !subject || !exam,
    };
};

export default ExplanationSlug;
export { getStaticProps, getStaticPaths };
