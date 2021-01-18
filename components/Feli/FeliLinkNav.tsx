import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useRouter } from "next/router";
import { useFeliTheme } from "../../providers/FeliThemeProvider";
import { darkTheme, lightTheme } from "../../theme/theme";

interface NavLink {
    title: string;
    href: string;
}

export const navLinks: NavLink[] = [];

export default function FeliLinkNav({}: {}) {
    const { isDark } = useFeliTheme();

    const router = useRouter();
    const [value, setValue] = useState(
        navLinks.map((link) => link.href).indexOf(router.pathname || "/")
    );

    const tabs = navLinks.map((link) => {
        const { title, href } = link;
        return (
            <Link key={href} href={href}>
                <a
                    style={{
                        color: isDark
                            ? darkTheme.palette.text.primary
                            : lightTheme.palette.text.primary,
                    }}
                >
                    <>
                        <Tab
                            label={title}
                            style={{
                                whiteSpace: "nowrap",
                            }}
                        />
                    </>
                </a>
            </Link>
        );
    });

    const handleChange = (e, value) => {
        // setValue(value);
        // router.push(value);
    };

    useEffect(() => {
        const prefectURLs = navLinks.map((link) => link.href);
        prefectURLs.forEach((url) => {
            router.prefetch(url).catch((err) => {
                console.log(`${url} prefetch failed ${err}`);
            });
        });
    }, []);

    if (navLinks.length <= 0) return <></>;
    return (
        <AppBar
            color="secondary"
            elevation={0}
            position="relative"
            style={{
                background: isDark
                    ? darkTheme.palette.secondary.main
                    : lightTheme.palette.secondary.main,
            }}
        >
            <Tabs
                value={value}
                variant="scrollable"
                scrollButtons="auto"
                onChange={handleChange}
                indicatorColor="primary"
                // textColor="primary"
                aria-label="links"
                style={{
                    justifyItems: "center",
                }}
            >
                {tabs}
            </Tabs>
        </AppBar>
    );
}
