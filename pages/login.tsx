import React from 'react';
import { GetServerSideProps } from 'next';
import { signIn, getSession } from 'next-auth/react';
import Image from 'next/image';
import fallLogo from '../public/fall-logo.png';
import winterLogo from '../public/winter-logo.png';

export const getServerSideProps: GetServerSideProps = async context => {
  try {
    const session = await getSession(context);
    if (session) {
      return {
        props: {},
        redirect: {
          permanent: false,
          destination: '/',
        },
      };
    }

    return {
      props: {},
    };
  } catch (error) {
    return {
      props: {
        error,
      },
    };
  }
};

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    signIn('email', { email, callbackUrl: '/' });
  };

  return (
    <div className="px-6 h-screen flex items-center justify-center">
      <div className="-mt-40 mx-auto w-full max-w-sm">
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
        <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
          Sign in your account
        </h2>
        <form className="mt-12">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <input
            type="email"
            required
            name="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="mt-1.5 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-sky-600 focus:ring-1 focus:border-sky-600 sm:text-sm"
          />
          <button
            type="button"
            onClick={e => handleSubmit(e)}
            className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-600"
          >
            {isLoading ? 'Loading...' : 'Email a login link'}
          </button>
        </form>
      </div>
    </div>
  );
}
