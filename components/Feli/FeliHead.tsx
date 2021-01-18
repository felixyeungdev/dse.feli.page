import Head from "next/head";
import { useFeliTheme } from "../../providers/FeliThemeProvider";

export default function FeliHead({ title }: { title?: string }) {
    const { isDark } = useFeliTheme();
    const displayTitle = title ? `${title} | dse.feli.page` : "dse.feli.page";
    return (
        <Head>
            <meta name="twitter:title" content={displayTitle} />
            <meta name="twitter:image" content="/assets/images/dse.png" />
            <meta property="og:title" content={displayTitle} />
            <meta property="og:image" content="/assets/images/dse.png" />
            <title>{displayTitle}</title>
            <link rel="icon" href="/favicon.png" />
            <link rel="manifest" href="/manifest.json" />
            <link rel="apple-touch-icon" href="/assets/images/dse.png" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="description" content="dse.feli.page" />
            <meta name="theme-color" content={isDark ? "#000000" : "#f9a825"} />
        </Head>
    );
}
