import Head from 'next/head';
import NavSidebar from '../components/NavSidebar';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="overflow-x-hidden">
      <Head>
        <title>Dashboard | 3D Mushing Events</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col lg:flex-row">
        <NavSidebar />
        <main className="pt-14 px-3 lg:pr-8 lg:pl-72 xl:pl-80 w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
