import auth from "./auth";
import initAdmin from "./initAdmin";
import { AccessLevel } from "@/config/accessLevels";
import dbConnect from "@/database/index";
import registerUser from "@/database/users/registerUser";
import admin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import getAccessLevel from "@/database/users/getAccessLevel";
import checkPermission from "@/database/users/checkPermission";
import { APIError } from "pages/api/_handlers";

export interface NextApiRequestWithAuth extends NextApiRequest {
    decodedIdToken: admin.auth.DecodedIdToken;
    allowed?: boolean;
}
export interface NextApiResponseWithAuth extends NextApiResponse {}

interface IAuthMiddleware {
    whitelistMethods?: string[];
    requiredAccessLevel?: AccessLevel;
}

const authMiddleware = (options: IAuthMiddleware = {}) => {
    const { whitelistMethods = [] } = options;
    const { requiredAccessLevel = AccessLevel.Guest } = options;
    return async (
        req: NextApiRequestWithAuth,
        _res: NextApiResponseWithAuth,
        next: NextHandler
    ) => {
        const { authorization } = req.headers;
        if (!authorization && !whitelistMethods.includes(req.method))
            throw new APIError({
                status: 401,
                message: "No authorization header provided",
            });

        await dbConnect();
        initAdmin();
        const decodedIdToken = await auth(authorization ?? "");
        if (!decodedIdToken && !whitelistMethods.includes(req.method)) {
            throw new APIError({
                status: 401,
                message: "Unauthorised",
            });
        }
        if (decodedIdToken) {
            await registerUser(decodedIdToken);
            if (requiredAccessLevel) {
                const userAccessLevel = await getAccessLevel(decodedIdToken);

                req.allowed = checkPermission(
                    userAccessLevel as AccessLevel,
                    requiredAccessLevel
                );
                if (!req.allowed) {
                    throw new APIError({
                        status: 405,
                        message: "Insufficient Permission",
                    });
                }
            }
        }
        req.decodedIdToken = decodedIdToken;

        next();
    };
};

export default authMiddleware;
