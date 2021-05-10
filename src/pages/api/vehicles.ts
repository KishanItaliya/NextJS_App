import { NextApiRequest, NextApiResponse } from "next";
import { openDB } from "../../../api/openDB";
import { authenticated } from "./people";

export default authenticated(async function getAllVehicles(req: NextApiRequest, res: NextApiResponse) {
    const db = await openDB();
    const vehicles = await db.all('SELECT * FROM vehicle');
    res.json(vehicles);
})