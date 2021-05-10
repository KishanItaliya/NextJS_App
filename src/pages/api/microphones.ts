import { NextApiRequest, NextApiResponse } from "next";
import { openDB } from "../../../api/openDB";

export default async function getAllMicrophones(req: NextApiRequest, res: NextApiResponse) {
    const db = await openDB();
    const microphones = await db.all('SELECT * FROM microphone');
    res.json(microphones);
}