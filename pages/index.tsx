import React, { useEffect } from "react";
import Content from "@/components/Content";
import PageHead from "../components/Head";
import { useRouter } from "next/router";
import languages from "../config/languages";
import { translate } from "../locales";
import LinkButton from "@/components/Button/Link";

export default function Home() {
    const router = useRouter();
    useEffect(() => {
        languages.forEach((lang) => {
            router.prefetch(`/${lang}`);
        });
    }, []);
    return (
        <>
            <PageHead />
            <Content>
                <div className="flex justify-center">
                    <LinkButton locale={router.locale} href="/explanations">
                        {translate(router.locale, "explanations")}
                    </LinkButton>
                </div>
            </Content>
        </>
    );
}
