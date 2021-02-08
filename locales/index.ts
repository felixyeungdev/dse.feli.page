import enGB from "@/locales/en-GB.json";
import zhHK from "@/locales/zh-HK.json";

const localeLookup: {
    [key: string]: { [key: string]: any };
} = {
    "en-GB": enGB,
    "zh-HK": zhHK,
};

export const locales = Object.keys(localeLookup);

function getDottedKeyFromObject(
    object: {
        [key: string]: any;
    },
    key: string
): string {
    const keyChunks = key.split(".");
    var data: any = object;
    for (var chunk of keyChunks) {
        if (data === undefined || data === null) break;
        data = data[chunk] ?? null;
    }
    return (data ?? key) as string;
}

export function translate(locale: string = "en-GB", key: string): string {
    const localeObj = localeLookup[locale];
    if (!localeObj) return key;
    const translated = getDottedKeyFromObject(localeObj, key);
    return translated;
}
