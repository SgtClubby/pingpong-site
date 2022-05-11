import { getSession } from 'next-auth/react';
import { updateOne } from '@/data/mongodb';

export default async function handler(req, res) {
    const session = await getSession({ req })
    if (!session?.user.admin) return res.status(401).json({ error: 'Unauthorized' });

    const { playerId, data, gamemode }= req.body;

    const dataToUpdate = { 
        $set: {
            [data.valueName]: parseInt(data.value) 
        }
    }
    try {
        const updatedUser = await updateOne(playerId, dataToUpdate, gamemode);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Error occurred while updating user:', id: playerId });
    }
}