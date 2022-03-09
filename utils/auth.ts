import { NextApiResponse } from 'next';
import { NextConnect } from 'next-connect';
import { getSession } from 'next-auth/react';
import { ExtendRequest } from '../interfaces';

export function withAuth(
  originalHandler: NextConnect<ExtendRequest, NextApiResponse>
) {
  return async function handler(req: ExtendRequest, res: NextApiResponse) {
    const session = await getSession({ req });

    if (!session) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    return originalHandler(req, res);
  };
}
