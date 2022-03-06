import { NextApiResponse } from 'next';
import { connectToDb } from '../db';
import { ExtendRequest } from '../interfaces';

export default async function database(
  req: ExtendRequest,
  _res: NextApiResponse,
  next: () => void
) {
  const db = await connectToDb();
  req.db = db;

  next();
}
