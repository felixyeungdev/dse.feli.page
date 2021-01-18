import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Paper from "@material-ui/core/Paper";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import FeliAppBar from "../../../components/Feli/FeliAppBar";
import FeliContent from "../../../components/Feli/FeliContent";
import FeliHead from "../../../components/Feli/FeliHead";
import { simpleSearch } from "../../../database/pp-explanation";
import { translate } from "../../../locales";

export default function Home({
    exam,
    subjects,
}: {
    exam: string;
    subjects: string[];
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
                        {subjects &&
                            subjects.map((subject) => (
                                <Link
                                    href={`/explanation/${exam}/${subject}`}
                                    locale={router.locale}
                                    key={subject}
                                    passHref
                                >
                                    <Button size="large">
                                        {`${translate(
                                            router.locale,
                                            exam
                                        )} ${translate(
                                            router.locale,
                                            subject
                                        )}`}
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
    const { exam } = context.params;
    const subjects = await simpleSearch({ exam }, "subject");
    if (subjects.length <= 0)
        return {
            notFound: true,
        };
    return { props: { exam, subjects }, revalidate: 60 };
}
