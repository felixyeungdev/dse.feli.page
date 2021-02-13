import React from "react";
import Content from "../../components/Content";
import PageHead from "../../components/Head";
import { useRouter } from "next/router";
import { translate } from "../../locales";
import LinkButton from "@/components/Button/Link";

export default function Home() {
    const router = useRouter();
    const { locale } = router;

    return (
        <>
            <PageHead title={translate(router.locale, "explanation")} />
            <Content>
                <div className="">
                    <h1>Dashboard</h1>
                    <div className="flex space-x-2">
                        <LinkButton
                            href="/dashboard/explanations"
                            locale={locale}
                        >
                            Explanations
                        </LinkButton>
                        <LinkButton href="/dashboard/pending" locale={locale}>
                            Manage Pending Playlist & Videos
                        </LinkButton>
                    </div>
                </div>
            </Content>
        </>
    );
}
