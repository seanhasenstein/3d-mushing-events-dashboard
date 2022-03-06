import { NextApiResponse } from 'next';
import nc from 'next-connect';
import { winterRace, fallRace } from '../../data';
import database from '../../middleware/db';
import { ExtendRequest } from '../../interfaces';
import { createId } from '../../utils/misc';

const handler = nc<ExtendRequest, NextApiResponse>()
  .use(database)
  .get(async (req, res) => {
    const fallEvent = {
      name: fallRace.name,
      dates: fallRace.dates,
      races: fallRace.races.map(e => {
        return {
          id: createId('race'),
          name: e.name,
          notes: e.notes,
        };
      }),
    };

    const winterEvent = {
      name: winterRace.name,
      dates: winterRace.dates,
      races: winterRace.races.map(e => {
        return {
          id: createId('race'),
          name: e.name,
          notes: e.notes,
        };
      }),
    };

    // const fallResult = await req.db
    //   .collection('events')
    //   .insertOne(fallRaceResult);
    // const winterResult = await req.db
    //   .collection('events')
    //   .insertOne(winterRaceResult);

    res.json({ fallEvent, winterEvent });
  });

export default handler;
