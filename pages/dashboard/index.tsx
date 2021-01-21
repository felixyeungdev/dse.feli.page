import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import React, { useEffect, useState } from "react";
import FeliAppBar from "../../components/Feli/FeliAppBar";
import FeliContent from "../../components/Feli/FeliContent";
import FeliHead from "../../components/Feli/FeliHead";
import Link from "next/link";
import { useRouter } from "next/router";
import { translate } from "../../locales";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { ytIDfromURL } from "../../helpers/youtubeId";
import Typography from "@material-ui/core/Typography";

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
                <ButtonGroup>
                    <Link href="/dashboard/explanations" locale={router.locale}>
                        <Button>Explanations</Button>
                    </Link>
                </ButtonGroup>
            </FeliContent>
        </>
    );
}
