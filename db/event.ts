import { Db, ObjectId } from 'mongodb';
import { Event, Registration } from '../interfaces';

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

export async function updateRegistration(
  db: Db,
  eventId: string,
  updatedRegistration: Registration
) {
  const result = await db.collection<Event>('events').findOneAndUpdate(
    { _id: eventId },
    { $set: { 'registrations.$[element]': updatedRegistration } },
    {
      arrayFilters: [{ 'element.id': updatedRegistration.id }],
      returnDocument: 'after',
    }
  );

  return result.value;
}
