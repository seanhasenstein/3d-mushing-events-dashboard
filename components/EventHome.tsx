import React from 'react';
import { Race, Registration } from '../interfaces';
import RegistrationsTable from './RegistrationsTable';
import RegistrationSidebar from './RegistrationSidebar';
import EventTotalsSidebar from './EventTotalsSidebar';

type Props = {
  race: Race;
  registrations: Registration[] | undefined;
};

export default function EventHome({ race, registrations }: Props) {
  const [eventTotalsSidebarIsOpen, setEventTotalsSidebarIsOpen] =
    React.useState(false);
  const [registrationSidebarIsOpen, setRegistrationSidebarIsOpen] =
    React.useState(false);
  const [sidebarRegistration, setSidebarRegistration] =
    React.useState<Registration>();

  return (
    <>
      <RegistrationsTable
        race={race}
        registrations={registrations}
        setEventTotalsSidebarIsOpen={setEventTotalsSidebarIsOpen}
        setRegistrationSidebarIsOpen={setRegistrationSidebarIsOpen}
        setSidebarRegistration={setSidebarRegistration}
      />
      <RegistrationSidebar
        events={race.events}
        isOpen={registrationSidebarIsOpen}
        setIsOpen={setRegistrationSidebarIsOpen}
        registration={sidebarRegistration}
      />
      <EventTotalsSidebar
        events={race.events}
        isOpen={eventTotalsSidebarIsOpen}
        setIsOpen={setEventTotalsSidebarIsOpen}
      />
    </>
  );
}
