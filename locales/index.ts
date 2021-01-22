import enGB from "./en-GB.json";
import zhHK from "./zh-HK.json";

const localeLookup = {
    "en-GB": enGB,
    "zh-HK": zhHK,
};

export const locales = Object.keys(localeLookup);

const errors = {
    localeNotFound: "LOCALE_NOT_FOUND",
    translationNotFound: "TRANSLATION_NOT_FOUND",
};

export function translate(locale: string, key: string): string {
    const localeObj = localeLookup[locale];
    if (!localeObj) return key;
    const translated = localeObj[key];
    if (!translated) return key;
    return translated;
}
