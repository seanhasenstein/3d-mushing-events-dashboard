import Link from 'next/link';
import Image from 'next/image';
import ProtectedRoute from '../components/ProtectedRoute';
import Layout from '../components/Layout';
import fallLogo from '../public/fall-logo.png';
import winterLogo from '../public/winter-logo.png';

type EventProps = {
  event: 'fall' | 'winter';
  dates: string;
  href: string;
  name: string;
};

function Event(props: EventProps) {
  return (
    <Link href={props.href}>
      <a className="mt-8 first:mt-0 xxs:mt-0 py-4 px-4 flex flex-col xxs:flex-row justify-center xxs:justify-between items-center bg-white xxs:border-t border-gray-200 first:border-t-0 shadow-md xxs:shadow-none hover:bg-gray-50 transition-colors">
        <div className="flex flex-col justify-center items-center xxs:flex-row xxs:gap-3">
          <div>
            <Image
              src={props.event === 'fall' ? fallLogo : winterLogo}
              alt={props.name}
              height={48}
              width={48}
            />
          </div>
          <div>
            <div className="text-center xxs:text-left text-lg font-semibold text-gray-900">
              {props.name}
            </div>
            <div className="text-center xxs:text-left text-sm font-medium text-gray-500">
              {props.dates}
            </div>
          </div>
        </div>
        <div className="mt-4 xxs:mt-0 flex justify-center items-center h-7 w-7 rounded-full bg-gray-200 xxs:bg-transparent xxs:h-auto xxs:w-auto xxs:block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-700 xxs:text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </a>
    </Link>
  );
}

export default function Home() {
  return (
    <ProtectedRoute>
      <Layout>
        <div className="mx-auto pt-1 lg:pt-6 pb-10 max-w-4xl">
          <h2 className="font-semibold text-xl tracking-tight text-gray-900 text-center xxs:text-left">
            Select an event:
          </h2>
          <div className="mt-7 xxs:mt-5 xxs:shadow">
            <Event
              event="fall"
              dates="Sat Oct 22nd - Sun Oct 23rd, 2022"
              href="/dotys-dusty-dog-dryland-race"
              name="Doty's Dusty Dog Dryland"
            />
            <Event
              event="winter"
              dates="Sat Feb 11th - Sun Feb 12th, 2023"
              href="/dotys-dog-days-of-winter-race"
              name="Doty's Dog Days of Winter"
            />
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
