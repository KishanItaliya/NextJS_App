import { NextApiRequest, NextApiResponse } from "next";
const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");

export default async function getPeople(req: NextApiRequest, res: NextApiResponse) {
    const db = await sqlite.open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });
    const people = await db.all('SELECT * FROM person');
    res.json(people);
}