import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/Layout';
import fallLogo from '../public/fall-logo.png';
import winterLogo from '../public/winter-logo.png';

export default function Home() {
  const eventLinks = {
    fall: '/dotys-dusty-dog-dryland-race',
    winter: '/dotys-dog-days-of-winter-race',
  };

  return (
    <Layout>
      <div className="sm:pt-4 pb-12 px-2 sm:px-8 grid lg:grid-cols-2 gap-12">
        <div className="mx-auto py-8 px-6 sm:px-10 max-w-lg w-full bg-white rounded-md border border-gray-200 shadow-xl">
          <div className="flex justify-center">
            <Image src={fallLogo} alt="Fall event" height={72} width={72} />
          </div>
          <h3 className="mt-3 text-xl font-bold tracking-tight text-gray-900 text-center">
            Doty's Dusty Dog Dryland
          </h3>
          <p className="mt-1 text-gray-700 text-center">
            Sat Oct 16th - Sun Oct 17th, 2021
          </p>
          <Link href={eventLinks.fall}>
            <a className="mt-5 mx-auto py-1.5 px-4 max-w-xs w-full sm:w-40 flex justify-center items-center bg-gray-900/95 border border-black text-gray-100 rounded-md shadow-sm hover:bg-gray-900 transition-colors focus:outline-none focus-visible:ring-2 focus:ring-offset-2 focus:ring-sky-600">
              Event home
            </a>
          </Link>
        </div>
        <div className="mx-auto py-8 px-6 sm:px-10 max-w-lg w-full bg-white rounded-md border border-gray-200 shadow-xl">
          <div className="flex justify-center">
            <Image src={winterLogo} alt="Fall event" height={72} width={72} />
          </div>
          <h3 className="mt-3 text-xl font-bold tracking-tight text-gray-900 text-center">
            Doty's Dog Days of Winter
          </h3>
          <p className="mt-1 text-gray-700 text-center">
            Sat Feb 12th - Sun Feb 13th, 2022
          </p>
          <Link href={eventLinks.winter}>
            <a className="mt-5 mx-auto py-1.5 px-4 max-w-xs w-full sm:w-40 flex justify-center items-center bg-gray-900/95 border border-black text-gray-100 rounded-md shadow-sm hover:bg-gray-900 transition-colors focus:outline-none focus-visible:ring-2 focus:ring-offset-2 focus:ring-sky-600">
              Event home
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
