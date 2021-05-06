import { NextApiRequest, NextApiResponse } from "next";
const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");

export default async function getPersonById(req: NextApiRequest, res: NextApiResponse) {
    const db = await sqlite.open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });

    if(req.method === 'PUT') {
        const statement = await db.prepare('UPDATE person SET name = ?, email = ? WHERE id = ?')
        const result = await statement.run(req.body.name, req.body.email, req.query.id);
        result.finalize();
    }

    const person = await db.get('SELECT * FROM person WHERE id = ?',[req.query.id]);
    res.json(person);
}