import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Container from "@material-ui/core/Container";
import Head from "next/head";
import React from "react";
import AppBar from "../../components/AppBar";
import Content from "../../components/Content";
import PageHead from "../../components/Head";
import { simpleSearch } from "../../database/pp-explanation";
import Link from "next/link";
import { useRouter } from "next/router";
import { translate } from "../../locales";
import Paper from "@material-ui/core/Paper";
import firebase from "firebase/app";
import "firebase/auth";
import { useAuth } from "@/firebase/client/authProvider";

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
            <PageHead title={translate(router.locale, "login")} />
            <Content>
                <Paper>
                    {!currentUser ? (
                        <Button onClick={handleSignIn}>
                            Sign in with Google
                        </Button>
                    ) : (
                        <Button onClick={handleSignOut}>Sign out</Button>
                    )}
                </Paper>
            </Content>
        </>
    );
}
