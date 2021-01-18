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

export default function Home({ subjects }: { subjects: string[] }) {
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
                        {subjects &&
                            subjects.map((subject) => (
                                <Link
                                    href={`/explanation/${subject}`}
                                    locale={router.locale}
                                    key={subject}
                                    passHref
                                >
                                    <Button size="large">
                                        {translate(router.locale, subject)}
                                    </Button>
                                </Link>
                            ))}
                    </ButtonGroup>
                </Paper>
            </FeliContent>
        </>
    );
}

export async function getStaticProps(context) {
    const subjects = await simpleSearch({}, "subject");
    if (subjects.length <= 0)
        return {
            notFound: true,
        };
    return { props: { subjects }, revalidate: 60 };
}
