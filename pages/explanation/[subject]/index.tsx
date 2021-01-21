import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import FeliAppBar from "../../../components/Feli/FeliAppBar";
import FeliContent from "../../../components/Feli/FeliContent";
import FeliHead from "../../../components/Feli/FeliHead";
import { ExplanationSearch } from "../../../database/explanation";
import { simpleSearch } from "../../../database/pp-explanation";
import { translate } from "../../../locales";

export default function Subject({
    subject,
    data,
}: {
    subject: string;
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
            <FeliContent center>
                <Paper>
                    <List dense>
                        {data &&
                            data.map((doc) => {
                                return (
                                    <Link
                                        href={`/explanation/${subject}/${doc.id}`}
                                        locale={router.locale}
                                        key={doc.id}
                                        passHref
                                    >
                                        <ListItem key={doc.id} button>
                                            <ListItemText
                                                primary={`${translate(
                                                    router.locale,
                                                    doc.id
                                                )} ${translate(
                                                    router.locale,
                                                    subject
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
    const { subject } = context.params;
    const data = await ExplanationSearch.getExams(subject);
    // if (exams.length <= 0)
    //     return {
    //         notFound: true,
    //     };
    return { props: { subject, data }, revalidate: 60 };
}
