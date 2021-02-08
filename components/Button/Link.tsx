import Link from "next/link";
import React, { ReactNode } from "react";
import BaseButton from ".";

interface Props {
    children: ReactNode;
    locale: string;
    href: string;
}

const LinkButton = ({ children, locale, href }: Props) => {
    return (
        <Link locale={locale} href={href} passHref>
            <a className="outline-none select-none">
                <BaseButton onClick={() => {}}>{children}</BaseButton>
            </a>
        </Link>
    );
};

export default LinkButton;
