import { NextApiRequest, NextApiResponse } from "next";
import { compare } from "bcrypt";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { secret } from "../../../api/secret";
const jwt = require("jsonwebtoken");

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    const db = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });

    if(req.method === 'POST') {
        const person = await db.get('SELECT * FROM person WHERE email = ?',
                        [req.body.email]);

        if(person !== undefined) {
            compare(req.body.password, person.password, function(err, result) {
                if(!err && result) {
                    const claims = {sub: person.id, personEmail: person.email};
                    const jwtoken = jwt.sign(claims, secret, { expiresIn: 60 * 60})
                    res.json({authToken: jwtoken});
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