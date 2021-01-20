import enGB from "./en-GB.json";
import zhHK from "./zh-HK.json";

const locales = {
    "en-GB": enGB,
    "zh-HK": zhHK,
};

const errors = {
    localeNotFound: "LOCALE_NOT_FOUND",
    translationNotFound: "TRANSLATION_NOT_FOUND",
};

export function translate(locale: string, key: string): string {
    const localeObj = locales[locale];
    if (!localeObj) return key;
    const translated = localeObj[key];
    if (!translated) return key;
    return translated;
}
