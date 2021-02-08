import AppBar from "../components/AppBar";
import Content from "../components/Content";
import FeliFooter from "../components/Footer";
import PageHead from "../components/Head";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Image from "next/image";
import Link from "next/link";
import LinkButton from "@/components/Button/Link";
import { useRouter } from "next/router";

export default function $404() {
    const router = useRouter();
    const { locale } = router;
    return (
        <>
            <PageHead title="Not Found" />
            <Content>
                <div className="flex flex-col items-center">
                    <img
                        src="/assets/images/undraw_page_not_found.svg"
                        alt="404 image"
                        className="max-w-2xl"
                    />
                    <h1 className="tracking-wide mt-4">
                        This page could not be found...
                    </h1>
                    <div className="mt-2">
                        <LinkButton locale={locale} href="/">
                            Return Home
                        </LinkButton>
                    </div>
                </div>
            </Content>
        </>
    );
}
