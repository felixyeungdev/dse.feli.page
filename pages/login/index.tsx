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
import uiConfig from "../../firebase/client/config-ui";
import { useAuth } from "../../providers/FeliAuthProvider";
import firebase from "firebase/app";
import "firebase/auth";

export default function Home({ exams }: { exams: string[] }) {
    const router = useRouter();
    const { currentUser } = useAuth();
    const auth = firebase.auth();

    function handleSignIn() {
        auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    function handleSignOut() {
        currentUser && auth.signOut();
    }

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
                    {!currentUser ? (
                        <Button onClick={handleSignIn}>
                            Sign in with Google
                        </Button>
                    ) : (
                        <Button onClick={handleSignOut}>Sign out</Button>
                    )}
                </Paper>
            </FeliContent>
        </>
    );
}
