import { getUser } from '@/data/mongodb';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    if (!req.query.name) return res.status(400).json({ error: 'No name provided' });
    const session = await getSession({ req });
    if (!session) return res.status(401).json({ error: 'Not logged in' });
    if (session.user.name !== req.query.name) return res.status(401).json({ error: 'Unauthorized' });
    res.status(200).json( await getUser(req.query.name, { projection: {_id: 0, image: 0, isAdmin: 0, email: 0, emailVerified: 0}}) );
}