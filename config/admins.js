// To be replaced with a real implementation of the admins.js file.
// where admins are gotten from db.

import { getAdmins } from '@/data/mongodb';

export const admins = await getAdmins();
