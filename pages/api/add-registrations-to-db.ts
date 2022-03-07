import type { NextApiResponse } from 'next';
import { faker } from '@faker-js/faker';
import { ExtendRequest, Race, Registration } from '../../interfaces';
import { createReceiptNumber, requiresGuardian } from '../../utils/misc';
import nc from 'next-connect';
import database from '../../middleware/db';
import { ObjectId } from 'mongodb';

interface Request extends ExtendRequest {
  query: {
    event: 'fall' | 'winter';
    registrations: string;
  };
}

const handler = nc<Request, NextApiResponse>()
  .use(database)
  .get(async (req, res) => {
    const fallEvent = await req.db
      .collection('events')
      .findOne({ _id: new ObjectId('622197c11853e4e8e8a82930') });
    const winterEvent = await req.db
      .collection('events')
      .findOne({ _id: new ObjectId('622197c11853e4e8e8a82931') });

    function getRandomEventIndex() {
      const min = 0;
      const max =
        (req.query.event === 'fall'
          ? fallEvent?.races.length
          : winterEvent?.races.length) - 1;
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      return randomNumber;
    }

    function getRandomNumberOfEvents() {
      const min = 1;
      const max = 2;
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      return randomNumber;
    }

    function getEvents() {
      const eventRaces =
        req.query.event === 'fall' ? fallEvent?.races : winterEvent?.races;
      const numberOfEvents = getRandomNumberOfEvents();
      const races = Array(numberOfEvents)
        .fill('')
        .map(() => eventRaces[getRandomEventIndex()]);
      const result = races.reduce((accumulator: Race[], currentRace) => {
        if (accumulator.some(a => a.id === currentRace.id)) {
          return accumulator;
        }
        return [...accumulator, currentRace];
      }, []);

      return result;
    }

    function buildRegistration(): Registration {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const birthday = faker.date
        .between(`${new Date('1-1-1972')}`, `${new Date('1-1-2014')}`)
        .toString();
      const guardian = requiresGuardian(
        birthday,
        req.query.event === 'fall' ? fallEvent?.dates[0] : winterEvent?.dates[0]
      )
        ? `${faker.name.firstName()} ${faker.name.lastName()}`
        : undefined;
      const date = faker.date.past().toString();
      const races = getEvents();
      const trailFee = 1400;
      const ISDRAFee = 600;
      const subtotal = 7500 * races.length;
      const total = trailFee + ISDRAFee + subtotal;

      return {
        _id: `${new ObjectId()}`,
        registrationId: createReceiptNumber(),
        firstName,
        lastName,
        birthday,
        guardian,
        gender: Math.round(Math.random()) > 0.5 ? 'male' : 'female',
        email: faker.internet.email(firstName, lastName).toLowerCase(),
        phone: faker.phone.phoneNumber('##########'),
        city: faker.address.city(),
        state: faker.address.stateAbbr(),
        races,
        summary: {
          trailFee,
          ISDRAFee,
          subtotal,
          total,
          stripeFee: Math.ceil(total * 0.029 + 30),
        },
        createdAt: date,
        updatedAt: date,
      };
    }

    const registrations = Array(Number(req.query.registrations))
      .fill('')
      .map(() => {
        return buildRegistration();
      });

    if (fallEvent && req.query.event === 'fall') {
      const { _id, ...update } = fallEvent;
      await req.db.collection('events').findOneAndUpdate(
        { _id: new ObjectId('622197c11853e4e8e8a82930') },
        {
          $set: {
            ...update,
            registrations: [...fallEvent.registrations, ...registrations],
          },
        }
      );
    }

    if (winterEvent && req.query.event === 'winter') {
      const { _id, ...update } = winterEvent;
      await req.db.collection('events').findOneAndUpdate(
        { _id: new ObjectId('622197c11853e4e8e8a82931') },
        {
          $set: {
            ...update,
            registrations: [...winterEvent.registrations, ...registrations],
          },
        }
      );
    }

    res.status(200).json({ registrations });
  });

export default handler;
