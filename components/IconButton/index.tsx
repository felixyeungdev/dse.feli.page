import React, { MouseEvent } from "react";
import { IconType } from "react-icons";

interface Props {
    Icon: IconType;
    ariaLabel: string;
    onClick: (e: MouseEvent) => void;
}

const IconButton = ({ Icon, ariaLabel, onClick }: Props) => {
    return (
        <button
            onClick={onClick}
            aria-label={ariaLabel}
            title={ariaLabel}
            className="w-12 h-12 flex items-center justify-center bg-white rounded-full hover:shadow-md active:shadow active:bg-gray-200 focus:outline-none ring-gray-400 focus:ring-4 ring-inset transition"
        >
            <Icon size={24} />
        </button>
    );
};

export default IconButton;
