import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import React, { useEffect } from "react";
import FeliAppBar from "../components/Feli/FeliAppBar";
import FeliContent from "../components/Feli/FeliContent";
import FeliFooter from "../components/Feli/FeliFooter";
import FeliHead from "../components/Feli/FeliHead";
import { useRouter } from "next/router";
import languages from "../config/languages";
import Link from "next/link";
import { translate } from "../locales";
import Paper from "@material-ui/core/Paper";

export default function Home() {
    const router = useRouter();
    useEffect(() => {
        languages.forEach((lang) => {
            router.prefetch(`/${lang}`);
        });
    }, []);
    return (
        <>
            <FeliHead />
            <FeliAppBar
                crumbs={[
                    {
                        display: "dse.feli.page",
                        href: "/",
                    },
                ]}
            />
            <FeliContent center>
                <Paper>
                    <ButtonGroup orientation="vertical" color="primary">
                        <Link locale={router.locale} href="/explanation">
                            <Button size="large">
                                {translate(router.locale, "explanation")}
                            </Button>
                        </Link>
                    </ButtonGroup>
                </Paper>
            </FeliContent>
            <FeliFooter />
        </>
    );
}
