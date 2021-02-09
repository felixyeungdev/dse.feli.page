import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const Content = ({ children }: Props) => {
    return (
        <>
            <main className="flex justify-center min-h-screen">
                <div className="max-w-6xl w-full mx-2 mt-4">{children}</div>
            </main>
        </>
    );
};

export default Content;
