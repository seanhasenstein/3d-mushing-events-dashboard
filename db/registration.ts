import { Db, ObjectId } from 'mongodb';
import { Registration } from '../interfaces';

const collection = {
  registrations: 'registrations',
};

export async function getRegistrationById(db: Db, _id: string) {
  const registration = await db
    .collection(collection.registrations)
    .findOne({ _id: new ObjectId(_id) });
  return registration;
}

export async function getRegistrationsByEvent(db: Db, eventId: string) {
  const registrations = await db
    .collection(collection.registrations)
    .find({ eventId });
  return registrations;
}

export async function updateRegistration(db: Db, registration: Registration) {
  const { _id, ...update } = registration;
  const updatedRegistration = await db
    .collection(collection.registrations)
    .findOneAndUpdate({ _id: new ObjectId(_id) }, update, {
      returnDocument: 'after',
    });
  return updatedRegistration;
}

export async function deleteRegistration(db: Db, _id: string) {
  await db
    .collection(collection.registrations)
    .findOneAndDelete({ _id: new ObjectId(_id) });
}
