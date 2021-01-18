import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Paper from "@material-ui/core/Paper";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import FeliAppBar from "../../../../../components/Feli/FeliAppBar";
import FeliContent from "../../../../../components/Feli/FeliContent";
import FeliHead from "../../../../../components/Feli/FeliHead";
import { simpleSearch } from "../../../../../database/pp-explanation";
import { translate } from "../../../../../locales";

export default function Home({
    exam,
    subject,
    year,
    questions,
}: {
    exam: string;
    subject: string;
    year: string;
    questions: string[];
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
            <FeliContent center>
                <Paper>
                    <ButtonGroup orientation="vertical" color="primary">
                        {questions &&
                            questions.map((question) => (
                                <Link
                                    href={`/explanation/${subject}/${exam}/${year}/${question}`}
                                    locale={router.locale}
                                    key={year}
                                >
                                    <Button size="large">
                                        {`${translate(
                                            router.locale,
                                            exam
                                        )} ${translate(
                                            router.locale,
                                            subject
                                        )} ${year}/${question}`}
                                    </Button>
                                </Link>
                            ))}
                    </ButtonGroup>
                </Paper>
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
    const { exam, subject, year } = context.params;
    const papers = await simpleSearch({ exam, subject, year }, "paper");
    const questions = [];
    for (var paper of papers) {
        const paperQuestions = await simpleSearch(
            {
                exam,
                subject,
                year,
                paper,
            },
            "question"
        );
        for (var paperQuestion of paperQuestions) {
            questions.push(`${paper}/Q${paperQuestion}`);
        }
    }
    if (questions.length <= 0)
        return {
            notFound: true,
        };
    return { props: { exam, subject, year, questions }, revalidate: 60 };
}
