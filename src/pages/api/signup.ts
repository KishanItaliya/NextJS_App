import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import { openDB } from "../../../api/openDB";


export default async function signup(req: NextApiRequest, res: NextApiResponse) {
    const db = await openDB();

    if(req.method === 'POST') {
        hash(req.body.password, 10, async function(err, hash) {
            // Store hash in your password DB.

        // check user is registered or not    
        const user = await db.get('SELECT * FROM person WHERE email = ?',[req.body.email]);
        
        if(user === undefined) {
            const statement = await db.prepare('INSERT INTO person (name, email, password) values (?, ?, ?)')
            await statement.run(req.body.name, req.body.email, hash);
            statement.finalize();

            const person = await db.all('SELECT * FROM person');
            res.json(person);
        }
        else {
            res.status(401).json({message: "user is already registered!!"})
        }
        });
    }
    else {
        res.status(405).json({message: "we only support POST"})
    }
    
}