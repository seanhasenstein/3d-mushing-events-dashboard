import EventHome from '../components/EventHome';
import Layout from '../components/Layout';
import useFakeRegistrations from '../hooks/useFakeRegistrations';
import { fallRace } from '../data';

export default function DotyDogDaysOfWinter() {
  const { registrations } = useFakeRegistrations('fall');

  return (
    <Layout>
      <EventHome race={fallRace} registrations={registrations} />
    </Layout>
  );
}
