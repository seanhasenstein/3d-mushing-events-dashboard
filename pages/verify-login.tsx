import Image from 'next/image';
import fallLogo from '../public/fall-logo.png';
import winterLogo from '../public/winter-logo.png';

export default function VerifyLogin() {
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
          <h2 className="mt-4 text-center text-2xl font-bold text-gray-900">
            Please check your email
          </h2>
          <p className="mt-4 text-gray-500 text-center">
            A sign in link has been sent to your email address.
          </p>
        </div>
      </div>
    </div>
  );
}
