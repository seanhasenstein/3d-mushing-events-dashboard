import React from 'react';
import { Event, Registration } from '../interfaces';
import RegistrationsTable from './RegistrationsTable';
import RegistrationSidebar from './RegistrationSidebar';
import EventTotalsSidebar from './EventTotalsSidebar';

type Props = {
  event: Event;
};

export default function EventHome({ event }: Props) {
  const [eventTotalsSidebarIsOpen, setEventTotalsSidebarIsOpen] =
    React.useState(false);
  const [registrationSidebarIsOpen, setRegistrationSidebarIsOpen] =
    React.useState(false);
  const [sidebarRegistration, setSidebarRegistration] =
    React.useState<Registration>();

  return (
    <>
      <RegistrationsTable
        event={event}
        setEventTotalsSidebarIsOpen={setEventTotalsSidebarIsOpen}
        setRegistrationSidebarIsOpen={setRegistrationSidebarIsOpen}
        setSidebarRegistration={setSidebarRegistration}
      />
      <RegistrationSidebar
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
