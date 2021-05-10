import { NextApiRequest, NextApiResponse } from "next";
import { compare } from "bcrypt";
import { openDB } from "../../../api/openDB";
import { secret } from "../../../api/secret";
const jwt = require("jsonwebtoken");
import cookie from "cookie";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    const db = await openDB();

    if(req.method === 'POST') {
        const person = await db.get('SELECT * FROM person WHERE email = ?',
                        [req.body.email]);

        if(person !== undefined) {
            compare(req.body.password, person.password, function(err, result) {
                if(!err && result) {
                    const claims = {sub: person.id, personEmail: person.email};
                    const jwtoken = jwt.sign(claims, secret, { expiresIn: 60 * 60})

                    res.setHeader("Set-Cookie", cookie.serialize("auth", jwtoken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        sameSite: "strict",
                        maxAge: 3600,
                        path: "/"
                    }))
                    res.json({message: "Welcome back to the app..."});
                }
                else {
                    res.json({message: "OOPS, Something went wrong!!"})
                }
            })
        }
        else {
            res.json({message: "Something went wrong!!"})
        }
    } 
    else {
        res.status(405).json({message: "we only support POST"});
    }
    
}