import React from "react";
import FooterLabel from "./Label";
import FooterLink from "./Link";

const Footer = () => {
    return (
        <div className="bg-gray-100 flex justify-center">
            <div className="text-center sm:text-left max-w-6xl mx-2 my-10 sm:flex justify-around w-full">
                <div>
                    <FooterLabel>Support</FooterLabel>
                    <FooterLink href="mailto:support@feli.page">
                        Email
                    </FooterLink>
                </div>
                <div>
                    <FooterLabel>Legal</FooterLabel>
                    <FooterLink href="https://feli.page/privacy">
                        Privacy
                    </FooterLink>
                    <FooterLink href="https://feli.page/terms">
                        Terms
                    </FooterLink>
                </div>
            </div>
        </div>
    );
};

export default Footer;
