import React from 'react';
import { GetServerSideProps } from 'next';
import { connectToDb, event as eventCollection } from '../db';
import { Event } from '../interfaces';
import { getRaceTotals } from '../utils/event';
import ProtectedRoute from '../components/ProtectedRoute';
import { RegistrationProvider } from '../hooks/useRegistrationData';
import Layout from '../components/Layout';
import EventHome from '../components/EventHome';
import EventErrorMessage from '../components/EventErrorMessage';

export const getServerSideProps: GetServerSideProps = async () => {
  const db = await connectToDb();
  const event = await eventCollection.getEventById(
    db,
    '622197c11853e4e8e8a82930'
  );

  if (!event) {
    return {
      notFound: true,
    };
  }

  const raceTotals = getRaceTotals(event);

  return {
    props: {
      event: { ...event, _id: `${event?._id}`, raceTotals },
    },
  };
};

type Props = {
  event: Event;
  error?: string;
};

export default function DotyDustyDogDryland({ event, error }: Props) {
  return (
    <ProtectedRoute>
      <RegistrationProvider data={event}>
        <Layout>{error ? <EventErrorMessage /> : <EventHome />}</Layout>
      </RegistrationProvider>
    </ProtectedRoute>
  );
}
