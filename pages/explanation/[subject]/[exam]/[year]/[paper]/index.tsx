import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import ExplanationBreadcrumbs from "../../../../../../components/Feli/ExplanationBreadcrumbs";
import FeliAppBar from "../../../../../../components/Feli/FeliAppBar";
import FeliContent from "../../../../../../components/Feli/FeliContent";
import FeliHead from "../../../../../../components/Feli/FeliHead";
import { ExplanationSearch } from "../../../../../../database/explanation";
import { simpleSearch } from "../../../../../../database/pp-explanation";
import { translate } from "../../../../../../locales";

export default function Home({
    exam,
    subject,
    year,
    paper,
    data,
}: {
    exam: string;
    subject: string;
    year: string;
    paper: string;
    data: any[];
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
                    />
                    <Paper>
                        <List dense>
                            {data &&
                                data.map((doc) => {
                                    return (
                                        <Link
                                            href={`/explanation/${subject}/${exam}/${year}/${paper}/${doc.id}`}
                                            locale={router.locale}
                                            key={doc.id}
                                            passHref
                                        >
                                            <ListItem key={doc.id} button>
                                                <ListItemText
                                                    primary={`${translate(
                                                        router.locale,
                                                        exam
                                                    )} ${translate(
                                                        router.locale,
                                                        subject
                                                    )} ${year}/${paper}/${translate(
                                                        router.locale,
                                                        doc.id
                                                    )}`}
                                                    secondary={`${translate(
                                                        router.locale,
                                                        "count"
                                                    )}: ${doc.count}`}
                                                />
                                            </ListItem>
                                        </Link>
                                    );
                                })}
                        </List>
                    </Paper>
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
    const { exam, subject, year, paper } = context.params;
    const data = await ExplanationSearch.getQuestions(
        subject,
        exam,
        year,
        paper
    );
    return { props: { exam, subject, year, paper, data }, revalidate: 1 };
}
