import EventHome from '../components/EventHome';
import Layout from '../components/Layout';
import useFakeRegistrations from '../hooks/useFakeRegistrations';
import { winterRace } from '../data';

export default function DotyDogDaysOfWinter() {
  const { registrations } = useFakeRegistrations('winter');

  return (
    <Layout>
      <EventHome race={winterRace} registrations={registrations} />
    </Layout>
  );
}
