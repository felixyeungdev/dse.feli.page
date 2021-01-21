import FeliAppBar from "../../../components/Feli/FeliAppBar";
import FeliContent from "../../../components/Feli/FeliContent";
import FeliHead from "../../../components/Feli/FeliHead";
import { translate } from "../../../locales";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getAllExplanations } from "../../../database/explanation";
import { DataGrid, ColDef, ValueGetterParams } from "@material-ui/data-grid";
import Container from "@material-ui/core/Container";

// subject;
// exam;
// year;
// paper;
// question;
// videos;

export default function Home({ explanations }) {
    const router = useRouter();
    const columns: ColDef[] = [
        { field: "id", headerName: translate(router.locale, "id"), hide: true },
        {
            field: "subject",
            headerName: translate(router.locale, "subject"),
            width: 100,
            hide: true,
        },
        {
            field: "exam",
            headerName: translate(router.locale, "exam"),
            width: 130,
            hide: true,
        },
        {
            field: "year",
            headerName: translate(router.locale, "year"),
            width: 130,
            hide: true,
        },
        {
            field: "paper",
            headerName: translate(router.locale, "paper"),
            width: 130,
            hide: true,
        },
        {
            field: "question",
            headerName: translate(router.locale, "question"),
            type: "number",
            width: 80,
            hide: true,
        },
        {
            field: "full",
            headerName: translate(router.locale, "full"),
            sortable: false,
            width: 300,
            valueGetter: (params: ValueGetterParams) => {
                const subject = params.getValue("subject");
                const exam = params.getValue("exam");
                const paper = params.getValue("paper");
                const question = params.getValue("question");
                const year = params.getValue("year");
                return `${exam} ${subject} ${year}/${paper}/Q${question}`;
            },
        },
        { field: "videos", headerName: "videos", width: 130 },
    ];

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
                <Container>
                    <Paper
                        style={{
                            height: "800px",
                            width: "100%",
                        }}
                    >
                        <DataGrid
                            disableSelectionOnClick
                            showToolbar
                            rows={explanations}
                            columns={columns}
                            autoPageSize
                            checkboxSelection
                            density="compact"
                        />
                    </Paper>
                </Container>
            </FeliContent>
        </>
    );
}

export async function getStaticProps(context) {
    const explanations = await getAllExplanations();
    console.log(explanations);
    return { props: { explanations }, revalidate: 60 };
}
