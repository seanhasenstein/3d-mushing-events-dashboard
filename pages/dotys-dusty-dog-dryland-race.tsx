import React from 'react';
import { GetServerSideProps } from 'next';
import { ObjectId } from 'mongodb';
import { connectToDb } from '../db';
import { Event } from '../interfaces';
import { getRaceTotals } from '../utils/event';
import ProtectedRoute from '../components/ProtectedRoute';
import { RegistrationProvider } from '../hooks/useRegistrationData';
import Layout from '../components/Layout';
import EventHome from '../components/EventHome';

export const getServerSideProps: GetServerSideProps = async () => {
  const db = await connectToDb();
  const event = await db
    .collection('events')
    .findOne<Event>({ _id: new ObjectId('622197c11853e4e8e8a82930') });

  if (!event) {
    return {
      props: { error: 'Failed to fetch the event.' },
      // TODO: handle when no event is found.
    };
  }

  const raceTotals = getRaceTotals(event);

  return {
    props: {
      event: { ...event, _id: `${event?._id}`, raceTotals },
    },
  };
};

export default function DotyDustyDogDryland({ event }: { event: Event }) {
  return (
    <ProtectedRoute>
      <RegistrationProvider data={event}>
        <Layout>
          <EventHome />
        </Layout>
      </RegistrationProvider>
    </ProtectedRoute>
  );
}
