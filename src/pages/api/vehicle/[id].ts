import { NextApiRequest, NextApiResponse } from "next";
import { openDB } from "../../../../api/openDB";

export default async function getVehicleById(req: NextApiRequest, res: NextApiResponse) {
    const db = await openDB();
    const vehicle = await db.get('SELECT * FROM vehicle WHERE id = ?',[req.query.id]);
    res.json(vehicle);
}