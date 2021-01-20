import youtubedl from "youtube-dl";

export const getYouTubeInfo = async (
    url: string
): Promise<{ [key: string]: any }[]> => {
    return new Promise((resolve, reject) => {
        console.log(`Getting YouTube info for ${url}`);
        youtubedl.getInfo(url, [], function (err, info: any) {
            if (err) {
                console.log(`Error getting info for ${url}`);
                reject(err);
            }
            console.log(`Done getting info for ${url}`);
            resolve(info);
        });
    });
};

// https://www.youtube.com/watch?v=HoYYI5plO1c&list=PLzDe9mOi1K8oil8jaHDh0t6E1Qqr6RCME&index=4&t=6s
