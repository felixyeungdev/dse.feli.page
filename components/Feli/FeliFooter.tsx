import { useFeliTheme } from "../../providers/FeliThemeProvider";
import AppBar from "@material-ui/core/AppBar";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import { darkTheme, lightTheme } from "../../theme/theme";
import React from "react";
import { navLinks } from "./FeliLinkNav";

export default function FeliFooter() {
    const { isDark } = useFeliTheme();

    return (
        <>
            {/* <Paper elevation={4}>
                <footer
                    style={{
                        width: "100%",
                        height: "100px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: isDark
                            ? darkTheme.palette.secondary.main
                            : lightTheme.palette.secondary.main,
                    }}
                >
                    <Container
                        style={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Grid
                            container
                            style={{ textAlign: "center", maxWidth: "300px" }}
                        >
                            {navLinks.map((link) => {
                                const { title, href } = link;
                                return (
                                    <Grid item xs={4} md={6}>
                                        <Link href={href}>
                                            <a>{title}</a>
                                        </Link>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Container>
                </footer>
            </Paper> */}
        </>
    );
}
