import { NextApiRequest, NextApiResponse } from "next";
import { openDB } from "../../../../../api/openDB";

export default async function getAllVehiclesByPersonId(req: NextApiRequest, res: NextApiResponse) {
    const db = await openDB();
    const allVehicles = await db.all('SELECT * FROM vehicle WHERE ownerId = ?',[req.query.id]);
    res.json(allVehicles);
}