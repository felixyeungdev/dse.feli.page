import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import React, { useEffect, useState } from "react";
import AppBar from "../../components/AppBar";
import Content from "../../components/Content";
import PageHead from "../../components/Head";
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
            <PageHead title={translate(router.locale, "explanation")} />
            <Content>
                <ButtonGroup>
                    <Link href="/dashboard/explanations" locale={router.locale}>
                        <Button>Explanations</Button>
                    </Link>
                </ButtonGroup>
            </Content>
        </>
    );
}
