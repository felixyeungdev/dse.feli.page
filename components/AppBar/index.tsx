import FeliIcon from "../Icon";
import { locales, translate } from "../../locales";
import IconButton from "../IconButton";
import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";
import { HiOutlineGlobeAlt } from "react-icons/hi";

export default function AppBar() {
    const router = useRouter();
    const { locale } = router;

    const changeLocale = () => {
        const locales_ = [...locales, ...locales];
        const current = locales_.indexOf(router.locale);
        const next = locales_[current + 1];
        router.push(
            {
                pathname: router.pathname,
                query: router.query,
            },
            null,
            {
                shallow: true,
                locale: next,
            }
        );
    };

    return (
        <>
            <nav className="min-h-56 md:min-h-64 bg-white shadow md:shadow-md flex items-center justify-center fixed top-0 w-full">
                <div className="flex max-w-6xl w-full items-center justify-between mx-2">
                    <Link href="/">
                        <a className="flex space-x-4 items-center">
                            <FeliIcon />
                            <div
                                className="text-
                            xl font-semibold"
                            >
                                DSE
                            </div>
                        </a>
                    </Link>
                    <div className="flex">
                        <IconButton
                            Icon={HiOutlineGlobeAlt}
                            onClick={changeLocale}
                            ariaLabel={translate(locale, "change_language")}
                        />
                    </div>
                </div>
            </nav>
            <div className="min-h-56 md:min-h-64 w-full"></div>
        </>
    );
}
