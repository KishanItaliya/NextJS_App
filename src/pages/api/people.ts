import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { openDB } from "../../../api/openDB";
import { secret } from "../../../api/secret";
const jwt = require("jsonwebtoken");

export const authenticated = (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    jwt.verify(req.cookies.auth, secret, async function(err: any, decoded: any) {
        if(!err && decoded) {
            return await fn(req, res);
        }
        res.status(401).json({message: "Sorry you are not authenticated"});
    })
}

export default authenticated(async function getPeople(req: NextApiRequest, res: NextApiResponse) {
    const db = await openDB();
    const people = await db.all('SELECT id, email, name FROM person');
    res.json(people);
});