import FeliAppBar from "../components/Feli/FeliAppBar";
import FeliContent from "../components/Feli/FeliContent";
import FeliFooter from "../components/Feli/FeliFooter";
import FeliHead from "../components/Feli/FeliHead";
import styles404 from "../styles/404.module.scss";
import AppBar from "@material-ui/core/AppBar";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function $404() {
    return (
        <>
            <FeliHead title="Not Found | Feli Page" />
            <FeliAppBar
                crumbs={[
                    { href: "/", display: "Home" },
                    { href: "/404", display: "404 Not Found" },
                ]}
            />
            <FeliContent center>
                <Container className={styles404.container}>
                    <Image
                        src="/assets/images/undraw_page_not_found.svg"
                        layout="responsive"
                        height={100}
                        width={350}
                        alt="404 Image"
                    />
                    <div style={{ height: 32 }}></div>
                    <Typography variant="h5">
                        This page could not be found
                    </Typography>
                    <div style={{ height: 32 }}></div>
                    <Link href="/">
                        <a>
                            <Typography
                                variant="h6"
                                style={{
                                    display: "inline-block",
                                }}
                            >
                                Return Home
                            </Typography>
                        </a>
                    </Link>
                </Container>
            </FeliContent>
            <FeliFooter />
        </>
    );
}
