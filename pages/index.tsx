import React from 'react';
import Layout from '../components/Layout';
import RegistrationsTable from '../components/RegistrationsTable';
import RegistrationSidebar from '../components/RegistrationSidebar';
import { Registration } from '../interfaces';

export default function Home() {
  const [sidebarIsOpen, setSidebarIsOpen] = React.useState(false);
  const [sidebarRegistration, setSidebarRegistration] =
    React.useState<Registration>();

  return (
    <Layout>
      <RegistrationsTable
        sidebarIsOpen={sidebarIsOpen}
        setSidebarIsOpen={setSidebarIsOpen}
        setSidebarRegistration={setSidebarRegistration}
      />
      <RegistrationSidebar
        isOpen={sidebarIsOpen}
        setIsOpen={setSidebarIsOpen}
        registration={sidebarRegistration}
      />
    </Layout>
  );
}
