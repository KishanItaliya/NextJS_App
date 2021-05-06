import { NextApiRequest, NextApiResponse } from "next";
const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");

export default async function getAllVehiclesByPersonId(req: NextApiRequest, res: NextApiResponse) {
    const db = await sqlite.open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });
    const allVehicles = await db.all('SELECT * FROM vehicle WHERE ownerId = ?',[req.query.id]);
    res.json(allVehicles);
}