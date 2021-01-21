import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Container from "@material-ui/core/Container";
import Head from "next/head";
import React from "react";
import FeliAppBar from "../../components/Feli/FeliAppBar";
import FeliContent from "../../components/Feli/FeliContent";
import FeliHead from "../../components/Feli/FeliHead";
import { simpleSearch } from "../../database/pp-explanation";
import Link from "next/link";
import { useRouter } from "next/router";
import { translate } from "../../locales";
import Paper from "@material-ui/core/Paper";
import { ExplanationSearch } from "../../database/explanation";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

export default function Explanation({ data }: { data: any[] }) {
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
                                        href={`/explanation/${doc.id}`}
                                        locale={router.locale}
                                        key={doc.id}
                                        passHref
                                    >
                                        <ListItem key={doc.id} button>
                                            <ListItemText
                                                primary={translate(
                                                    router.locale,
                                                    doc.id
                                                )}
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

export async function getStaticProps(context) {
    const data = await ExplanationSearch.getSubjects();
    if (data.length <= 0)
        return {
            notFound: true,
        };
    return { props: { data }, revalidate: 60 };
}
