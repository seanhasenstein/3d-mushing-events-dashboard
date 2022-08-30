import React from 'react';
import { Registration } from '../interfaces';
import useRegistrationData from '../hooks/useRegistrationData';
import RegistrationsTable from './RegistrationsTable';
import RegistrationSidebar from './RegistrationSidebar';
import EventTotalsSidebar from './EventTotalsSidebar';

export default function EventHome() {
  const { event } = useRegistrationData();
  const [totalsSidebarOpen, setTotalsSidebarOpen] = React.useState(false);
  const [registrationSidebarOpen, setRegistrationSidebarOpen] =
    React.useState(false);
  const [sidebarRegistration, setSidebarRegistration] =
    React.useState<Registration>();

  React.useEffect(() => {
    if (sidebarRegistration) {
      const updatedRegistration = event.registrations.find(
        r => r.id === sidebarRegistration.id
      );
      setSidebarRegistration(updatedRegistration);
    }
  }, [event]);

  return (
    <>
      <RegistrationsTable
        event={event}
        setTotalsSidebarOpen={setTotalsSidebarOpen}
        setRegistrationSidebarOpen={setRegistrationSidebarOpen}
        setSidebarRegistration={setSidebarRegistration}
      />
      <RegistrationSidebar
        event={event}
        races={event.races}
        isOpen={registrationSidebarOpen}
        setIsOpen={setRegistrationSidebarOpen}
        registration={sidebarRegistration}
      />
      <EventTotalsSidebar
        raceTotals={event.raceTotals}
        isOpen={totalsSidebarOpen}
        setIsOpen={setTotalsSidebarOpen}
      />
    </>
  );
}
