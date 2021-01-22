import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import React from "react";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Typography from "@material-ui/core/Typography";
import { useRouter } from "next/router";
import { useFeliTheme } from "../../providers/FeliThemeProvider";
import Link from "next/link";
import { translate } from "../../locales";

export default function ExplanationBreadcrumbs({
    subject,
    exam,
    year,
    paper,
    question,
}: {
    subject?: string;
    exam?: string;
    year?: string;
    paper?: string;
    question?: string;
}) {
    const { toggle, isDark } = useFeliTheme();
    const router = useRouter();
    const depth = ["explanation"];
    subject && depth.push(subject);
    exam && depth.push(exam);
    year && depth.push(year);
    paper && depth.push(paper);
    question && depth.push(question);
    console.log(depth);

    const generateHref = (i: number) => {
        const href = `/${[...depth].splice(0, i + 1).join("/")}`;
        return href;
    };

    return (
        <>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                // maxItems={3}
                style={{
                    flexGrow: 1,
                }}
            >
                {depth &&
                    depth.map((chunk, i, depth) => {
                        const isLast = i === depth.length - 1;

                        return (
                            <Link
                                href={generateHref(i)}
                                key={generateHref(i)}
                                locale={router.locale}
                            >
                                <a>
                                    <Typography
                                        style={{
                                            color: isLast
                                                ? isDark
                                                    ? "#ffffff"
                                                    : "#000000"
                                                : "#888888",
                                        }}
                                    >
                                        {translate(router.locale, chunk)}
                                    </Typography>
                                </a>
                            </Link>
                        );
                    })}
            </Breadcrumbs>
            <div style={{ height: 16 }}></div>
        </>
    );
}
