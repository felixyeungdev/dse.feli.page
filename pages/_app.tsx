import "../styles/globals.scss";
import React from "react";
import "tailwindcss/tailwind.css";
import { AuthProvider } from "@/firebase/client/authProvider";
import Layout from "@/components/Layout";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <AuthProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </AuthProvider>
        </>
    );
}

export default MyApp;
