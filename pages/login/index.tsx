import React from "react";
import Content from "../../components/Content";
import PageHead from "../../components/Head";
import { useRouter } from "next/router";
import { translate } from "../../locales";
import firebase from "firebase/app";
import "firebase/auth";
import { useAuth } from "@/firebase/client/authProvider";
import ActionButton from "@/components/Button/Action";

export default function Home() {
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
                {!currentUser ? (
                    <ActionButton onClick={handleSignIn}>
                        Sign in with Google
                    </ActionButton>
                ) : (
                    <ActionButton onClick={handleSignOut}>
                        Sign out
                    </ActionButton>
                )}
            </Content>
        </>
    );
}
