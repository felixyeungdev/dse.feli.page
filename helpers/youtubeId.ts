export function ytIDfromURL(url: string) {
    try {
        const urlObj = new URL(url);
        return urlObj.searchParams.get("v");
    } catch (error) {
        return url;
    }
}
