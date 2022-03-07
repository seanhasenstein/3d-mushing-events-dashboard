import { Db, ObjectId } from 'mongodb';
import { Event } from '../interfaces';

const collections = {
  events: 'events',
};

export async function getEventById(db: Db, _id: string) {
  const result = await db
    .collection(collections.events)
    .findOne<Event>({ _id: new ObjectId(_id) });

  if (!result) {
    throw new Error('Failed to fetch the event');
  }

  return result;
}
