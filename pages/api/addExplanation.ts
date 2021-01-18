// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { addNewExplanation, simpleSearch } from "../../database/pp-explanation";
import Users from "../../database/users";
import authUser from "../../helpers/authUser";
import parseIdTokenFromCookie from "../../helpers/parseIdTokenFromCookie";

export default async (req, res) => {
    const idToken = parseIdTokenFromCookie(req);
    if (!idToken) {
        res.status(400).json({
            error: "not_allowed",
        });
        return;
    }
    const currentUser = await authUser(idToken);

    const allowed = await Users.checkPermission(currentUser);
    if (!allowed) {
        res.status(403).json({
            error: "forbidden",
        });
        return;
    }
    const {
        exam,
        subject,
        year,
        paper,
        question,
        vid_id,
        vid_author,
        tags,
    } = req.body;
    const checkDuplicate = await simpleSearch({ vid_id }, "vid_id");
    console.log(checkDuplicate);
    res.statusCode = 200;
    if (checkDuplicate.length >= 1) {
        res.status(400).json({ duplicate: true, message: "duplicate video" });
        return;
    }

    const result = await addNewExplanation({
        exam,
        subject,
        year,
        paper,
        question,
        vid_id,
        vid_author,
        tags,
    });
    res.status(201).json({
        duplicate: false,
        result,
    });
};
