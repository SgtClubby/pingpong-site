import { getSession } from 'next-auth/react';
import { getAllDiscordUsers } from '@/data/mongodb';
import { admins } from '@/config/admins';

export default async function handler(req, res) {
    const session = await getSession({ req })
    if (!session) return res.status(401).json({ error: 'Unauthorized' });
    if (!admins.includes(session.user.id)) return res.status(401).json({ error: 'Unauthorized' });

    res.status(200).json( await getAllDiscordUsers());
}
