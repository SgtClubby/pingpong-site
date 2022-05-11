import { getSession } from 'next-auth/react';
import { getGuildInfo } from '@/data/mongodb';
import { adminIds } from '@/config/admins';

export default async function handler(req, res) {
    const session = await getSession({ req })
    if (!session) return res.status(401).json({ error: 'No session found.' });
    if (!adminIds.includes(session.user.id)) return res.status(401).json({ error: 'Unauthorized endpoint' });

    const guild = getGuildInfo();
    res.status(200).json(guild.guild);
}