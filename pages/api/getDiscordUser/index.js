import { getSession } from 'next-auth/react';
import { fetchDiscordData } from '@/data/mongodb';

export default async function handler(req, res) {
    const session = await getSession({ req })
    if (!session) return res.status(401).json({ error: 'Unauthorized' });
    if (!req.query.id) return res.status(400).json({ error: 'Param id missing' });
    res.status(200).json( await fetchDiscordData(req.query.id));
}