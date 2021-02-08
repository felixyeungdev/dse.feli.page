import { ReactNode } from "react";
import AppBar from "../AppBar";
import Footer from "@/components/Footer";

interface Props {
    children?: ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <>
            <AppBar />
            {children}
            <Footer />
        </>
    );
};

export default Layout;
