import React, { ReactNode, MouseEvent } from "react";
import Button from ".";

interface Props {
    children: ReactNode;
    onClick: (e: MouseEvent) => void;
}

const ActionButton = ({ children, onClick }: Props) => {
    return <Button onClick={onClick}>{children}</Button>;
};

export default ActionButton;
