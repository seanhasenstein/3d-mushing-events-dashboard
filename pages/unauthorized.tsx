import Link from 'next/link';
import Image from 'next/image';
import fallLogo from '../public/fall-logo.png';
import winterLogo from '../public/winter-logo.png';

export default function Unauthorized() {
  return (
    <div className="px-6 h-screen flex items-center justify-center">
      <div className="-mt-40 mx-auto py-10 px-10 w-full max-w-md bg-white shadow-md border border-gray-200 rounded-md">
        <div className="flex justify-center items-center">
          <div className="mr-8">
            <Image
              src={fallLogo}
              alt="Dotys Dusty Dog Dryland Race"
              width={72}
              height={72}
            />
          </div>
          <div>
            <Image
              src={winterLogo}
              alt="Dotys Dog Days of Winter Race"
              width={72}
              height={72}
            />
          </div>
        </div>
        <div>
          <h2 className="mt-4 text-center text-2xl xxs:text-3xl font-extrabold text-gray-900">
            Unauthorized
          </h2>
          <p className="mt-4 text-gray-500 text-center">
            You must be logged in with a verified email to proceed.
          </p>
          <Link href="/login">
            <a className="mt-8 mx-auto w-48 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-600">
              Go to login
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
