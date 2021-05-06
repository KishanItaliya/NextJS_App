import { NextApiRequest, NextApiResponse } from "next";
const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");

export default async function getVehicleById(req: NextApiRequest, res: NextApiResponse) {
    const db = await sqlite.open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });
    const vehicle = await db.get('SELECT * FROM vehicle WHERE id = ?',[req.query.id]);
    res.json(vehicle);
}