import { getSession } from 'next-auth/react';
import { getAllData } from '@/data/mongodb';

export default async function handler(req, res) {
    const session = await getSession({ req })
    if (!session) return res.status(401).json({ error: 'No session' });

    res.status(200).json( await getAllData());
}