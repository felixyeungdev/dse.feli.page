import { translate } from "@/locales/index";
import { useRouter } from "next/router";
import React from "react";
import FooterLabel from "./Label";
import FooterLink from "./Link";

const Footer = () => {
    const router = useRouter();
    const { locale } = router;
    return (
        <div className="bg-gray-100 flex justify-center">
            <div className="text-center sm:text-left max-w-6xl mx-2 my-10 sm:flex justify-around w-full">
                <div>
                    <FooterLabel>
                        {translate(locale, "footer.support")}
                    </FooterLabel>
                    <FooterLink href="mailto:support@feli.page">
                        {translate(locale, "footer.email")}
                    </FooterLink>
                </div>
                <div>
                    <FooterLabel>
                        {translate(locale, "footer.legal")}
                    </FooterLabel>
                    <FooterLink href="https://feli.page/privacy">
                        {translate(locale, "footer.privacy")}
                    </FooterLink>
                    <FooterLink href="https://feli.page/terms">
                        {translate(locale, "footer.terms")}
                    </FooterLink>
                </div>
            </div>
        </div>
    );
};

export default Footer;
