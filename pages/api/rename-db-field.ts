import { NextApiResponse } from 'next';
import nc from 'next-connect';
import database from '../../middleware/db';
import { event } from '../../db';
import { ExtendRequest } from '../../interfaces';
// import { ObjectId } from 'mongodb';

const handler = nc<ExtendRequest, NextApiResponse>()
  .use(database)
  .get(async (req, res) => {
    const fetchedEvent = await event.getEventById(req.db, req.query.eventId);

    if (!fetchedEvent) {
      throw new Error('Event not found!');
    }

    // const updatedRegistrations = fetchedEvent.registrations.map(
    //   registration => {
    //     const { ...rest } = registration;
    //     const update = {
    //       ...rest,
    //     };

    //     return update;
    //   }
    // );

    // const updatedEvent: Event = {
    //   ...fetchedEvent,
    //   registrations: updatedRegistrations,
    // };

    // const { _id, ...updateMinusId } = updatedEvent;

    // await req.db
    //   .collection('events')
    //   .findOneAndUpdate(
    //     { _id: new ObjectId(req.query.eventId) },
    //     { $set: updateMinusId }
    //   );

    res.json({ success: true });
  });

export default handler;
