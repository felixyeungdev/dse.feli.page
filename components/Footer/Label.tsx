import React, { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const FooterLabel = ({ children }: Props) => {
    return (
        <div className="p-1 uppercase text-gray-500 font-bold tracking-wider">
            {children}
        </div>
    );
};

export default FooterLabel;
