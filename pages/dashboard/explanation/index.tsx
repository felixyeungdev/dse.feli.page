import FeliAppBar from "../../../components/Feli/FeliAppBar";
import FeliContent from "../../../components/Feli/FeliContent";
import FeliHead from "../../../components/Feli/FeliHead";
import { translate } from "../../../locales";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { DataGrid } from "@material-ui/data-grid";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getAllExplanations } from "../../../database/explanation";

export default function Home({ exams }: { exams: string[] }) {
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
                <></>
            </FeliContent>
        </>
    );
}

export async function getStaticProps(context) {
    const explanations = await getAllExplanations();
    // if (subjects.length <= 0)
    //     return {
    //         notFound: true,
    //     };
    return { props: { explanations }, revalidate: 60 };
}
