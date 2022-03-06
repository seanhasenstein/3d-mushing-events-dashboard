import { NextApiResponse } from 'next';
import nc from 'next-connect';
import database from '../../middleware/db';
import { Event, ExtendRequest } from '../../interfaces';
import { ObjectId } from 'mongodb';

interface Request extends ExtendRequest {
  query: {
    _id: string;
  };
}

const handler = nc<Request, NextApiResponse>()
  .use(database)
  .get(async (req, res) => {
    const result = await req.db
      .collection('events')
      .findOne<Event>({ _id: new ObjectId(req.query._id) });

    const accumulator = result?.races.map(r => ({ ...r, total: 0 }));

    const raceTotals = result?.registrations.reduce(
      (accumulator, currentRegistration) => {
        currentRegistration.races.forEach(race => {
          accumulator = accumulator?.map(a => {
            if (a.id === race.id) {
              return { ...a, total: a.total + 1 };
            }
            return a;
          });
        });
        return accumulator;
      },
      accumulator
    );

    res.json({ ...result, raceTotals });
  });

export default handler;
