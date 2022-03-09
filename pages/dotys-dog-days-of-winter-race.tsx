import React from 'react';
import { GetServerSideProps } from 'next';
import { ObjectId } from 'mongodb';
import ProtectedRoute from '../components/ProtectedRoute';
import Layout from '../components/Layout';
import EventHome from '../components/EventHome';
import { connectToDb } from '../db';
import { Event } from '../interfaces';

export const getServerSideProps: GetServerSideProps = async () => {
  const db = await connectToDb();
  const event = await db
    .collection('events')
    .findOne<Event>({ _id: new ObjectId('622197c11853e4e8e8a82931') });

  const accumulator = event?.races.map(r => ({ ...r, total: 0 }));

  const raceTotals = event?.registrations.reduce(
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

  return {
    props: {
      event: { ...event, _id: `${event?._id}`, raceTotals },
    },
  };
};

export default function DotyDogDaysOfWinter({ event }: { event: Event }) {
  return (
    <ProtectedRoute>
      <Layout>{event && <EventHome event={event} />}</Layout>
    </ProtectedRoute>
  );
}
