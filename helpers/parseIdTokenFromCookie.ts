import { parseCookies } from "nookies";
import { NextApiRequest } from "next";

export default function parseIdTokenFromCookie(req: NextApiRequest) {
    const cookies = parseCookies({ req });
    return cookies.token;
}
