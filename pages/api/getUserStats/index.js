import { getUserStats } from '@/data/mongodb';

export default async function handler(req, res) {
    if (!req.query.id) return res.status(400).json({ error: 'No id provided' });
    res.status(200).json( await getUserStats(req.query.id, req.query.name) );
}