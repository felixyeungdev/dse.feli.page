import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import YouTube from "react-youtube";
import ExplanationBreadcrumbs from "../../../../../../../components/Feli/ExplanationBreadcrumbs";
import FeliAppBar from "../../../../../../../components/Feli/FeliAppBar";
import FeliContent from "../../../../../../../components/Feli/FeliContent";
import FeliHead from "../../../../../../../components/Feli/FeliHead";
import { getExplanations } from "../../../../../../../database/explanation";
import {
    findDocuments,
    simpleSearch,
} from "../../../../../../../database/pp-explanation";
import { getVideoFromDatabase } from "../../../../../../../database/video";
import { translate } from "../../../../../../../locales";

export default function Home({
    exam,
    subject,
    year,
    paper,
    question,
    data,
}: {
    exam: string;
    subject: string;
    year: string;
    paper: string;
    question: string;
    data: { [key: string]: any };
}) {
    const router = useRouter();
    return (
        <>
            <FeliHead title={translate(router.locale, "explanation")} />
            <FeliAppBar
                crumbs={[
                    {
                        display: translate(router.locale, "explanation"),
                        href: "/",
                    },
                ]}
            />
            <FeliContent>
                <Container>
                    <ExplanationBreadcrumbs
                        subject={subject}
                        exam={exam}
                        year={year}
                        paper={paper}
                        question={question}
                    />

                    {data &&
                        data.videos.map((video) => {
                            return (
                                <Card
                                    key={video}
                                    style={{
                                        width: "100%",
                                        marginBottom: 32,
                                    }}
                                >
                                    <CardHeader
                                        title={`${translate(
                                            router.locale,
                                            exam
                                        )} ${translate(
                                            router.locale,
                                            subject
                                        )} ${year}/${paper}/Q${question}`}
                                        subheader={video.uploader}
                                    />
                                    <CardActionArea>
                                        {/* <CardContent> */}
                                        <YouTube
                                            videoId={video.id}
                                            opts={{
                                                height: "390",
                                                width: "100%",
                                            }}
                                        />
                                        {/* </CardContent> */}
                                    </CardActionArea>
                                </Card>
                            );
                        })}
                </Container>
            </FeliContent>
        </>
    );
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true,
    };
}

export async function getStaticProps(context) {
    const { exam, subject, year, paper, question: q } = context.params;

    const question = parseInt(q) || 0;

    const matches = await getExplanations({
        exam,
        subject,
        year,
        paper,
        question,
    });

    const oneMatch = matches && matches.length > 0 ? matches[0] : null;

    if (!oneMatch) {
        return {
            notFound: true,
        };
    }

    const data: any = { ...oneMatch };
    delete data.videos;
    data.videos = [];

    for (var video of oneMatch.videos) {
        const videoData = await getVideoFromDatabase(video);
        data.videos.push(videoData);
    }

    return {
        props: { exam, subject, year, paper, question, data },
        revalidate: 1,
    };
}
