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
import FeliAppBar from "../../../../../../../components/Feli/FeliAppBar";
import FeliContent from "../../../../../../../components/Feli/FeliContent";
import FeliHead from "../../../../../../../components/Feli/FeliHead";
import {
    findDocuments,
    simpleSearch,
} from "../../../../../../../database/pp-explanation";
import { translate } from "../../../../../../../locales";

export default function Home({
    exam,
    subject,
    year,
    paper,
    question,
    documents,
}: {
    exam: string;
    subject: string;
    year: string;
    paper: string;
    question: string;
    documents: any[];
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
            <FeliContent paddingTop>
                <Container>
                    {documents &&
                        documents.map((doc) => {
                            return (
                                <Card
                                    key={doc.id}
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
                                        subheader={doc.vid_author}
                                    />
                                    <CardActionArea>
                                        {/* <CardContent> */}
                                        <YouTube
                                            videoId={doc.vid_id}
                                            opts={{
                                                height: "390",
                                                width: "100%",
                                            }}
                                        />
                                        {/* </CardContent> */}
                                    </CardActionArea>
                                    {/* <CardActions>
                                        <Button size="small" color="primary">
                                            Share
                                        </Button>
                                        <Button size="small" color="primary">
                                            Learn More
                                        </Button>
                                    </CardActions> */}
                                </Card>
                            );
                        })}
                    <></>
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
    var question = q;
    if (q.startsWith("Q")) question = q.slice(1);

    const documents = await findDocuments({
        exam,
        subject,
        year,
        paper,
        question,
    });

    return {
        props: { exam, subject, year, paper, question, documents },
        revalidate: 60,
    };
}
