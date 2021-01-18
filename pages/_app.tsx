import "../styles/globals.scss";
import CssBaseline from "@material-ui/core/CssBaseline";
import React, { useEffect, useState } from "react";
import {
    InjectMuiTheme,
    ThemeContextProvider,
} from "../providers/FeliThemeProvider";
import { AuthProvider } from "../providers/FeliAuthProvider";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <ThemeContextProvider>
                <AuthProvider>
                    <InjectMuiTheme>
                        <CssBaseline />
                        <Component {...pageProps} />
                    </InjectMuiTheme>{" "}
                </AuthProvider>
            </ThemeContextProvider>
        </>
    );
}

export default MyApp;
