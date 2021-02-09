import React, { ReactNode } from "react";

interface Props {
    href: string;
    children: ReactNode;
}

const FooterLink = ({ href, children }: Props) => {
    return (
        <a
            href={href}
            target="_blank"
            className="py-0.5 px-1 block hover:text-feli active:text-feli-dark hover:underline transition-colors focus:outline-none focus:ring-2 ring-gray-600 rounded-md"
        >
            {children}
        </a>
    );
};

export default FooterLink;
