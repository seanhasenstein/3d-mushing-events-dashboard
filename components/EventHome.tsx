import React from 'react';
import { Registration } from '../interfaces';
import useRegistrationData from '../hooks/useRegistrationData';
import RegistrationsTable from './RegistrationsTable';
import RegistrationSidebar from './RegistrationSidebar';
import EventTotalsSidebar from './EventTotalsSidebar';

export default function EventHome() {
  const { event } = useRegistrationData();
  const [eventTotalsSidebarIsOpen, setEventTotalsSidebarIsOpen] =
    React.useState(false);
  const [registrationSidebarIsOpen, setRegistrationSidebarIsOpen] =
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
        setEventTotalsSidebarIsOpen={setEventTotalsSidebarIsOpen}
        setRegistrationSidebarIsOpen={setRegistrationSidebarIsOpen}
        setSidebarRegistration={setSidebarRegistration}
      />
      <RegistrationSidebar
        event={event}
        races={event.races}
        isOpen={registrationSidebarIsOpen}
        setIsOpen={setRegistrationSidebarIsOpen}
        registration={sidebarRegistration}
      />
      <EventTotalsSidebar
        raceTotals={event.raceTotals}
        isOpen={eventTotalsSidebarIsOpen}
        setIsOpen={setEventTotalsSidebarIsOpen}
      />
    </>
  );
}
