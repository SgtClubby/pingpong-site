import { setNickname } from '@/data/mongodb';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    if (!req.query.name) return res.status(400).json({ error: 'No name provided' });
    if (!req.query.id) return res.status(400).json({ error: 'No id provided' });

    const session = await getSession({ req });
    if (!session) return res.status(401).json({ error: 'Not logged in' });
    if (session.user.name !== req.query.name) return res.status(401).json({ error: 'Unauthorized' });

    res.status(200).json( await setNickname(req.query.name, req.query.id, req.query.nickname) );
}