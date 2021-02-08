import React, { MouseEvent, ReactNode } from "react";

interface Props {
    children: ReactNode;
    onClick?: (e: MouseEvent) => void;
}

const BaseButton = ({ children, onClick = () => {} }: Props) => {
    return (
        <button
            onClick={onClick}
            className="px-4 py-2 shadow rounded-md focus:outline-none bg-white hover:shadow-lg active:shadow active:bg-gray-200 ring-gray-400 focus:ring-4 transition font-semibold uppercase tracking-wider"
        >
            {children}
        </button>
    );
};

export default BaseButton;
