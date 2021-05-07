import { NextApiRequest, NextApiResponse } from "next";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { authenticated } from "./people";

export default authenticated(async function getAllVehicles(req: NextApiRequest, res: NextApiResponse) {
    const db = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });
    const vehicles = await db.all('SELECT * FROM vehicle');
    res.json(vehicles);
})