import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import fallLogo from '../public/fall-logo.png';
import winterLogo from '../public/winter-logo.png';

type AuthErrorProps = {
  children: React.ReactNode;
};

function AuthError({ children }: AuthErrorProps) {
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
        <div>{children}</div>
      </div>
    </div>
  );
}

function LoginLink() {
  return (
    <Link href="/login">
      <a className="mt-8 mx-auto w-48 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-600">
        Go to login
      </a>
    </Link>
  );
}

export default function AuthenticationError() {
  const router = useRouter();
  const error =
    typeof router.query.error === 'string' && router.query.error.toLowerCase();

  if (error === 'configuration') {
    return (
      <AuthError>
        <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
          Server error
        </h2>
        <p className="mt-4 text-gray-500 text-center">
          There was a problem with the server configuration. Check the server
          logs for more information.
        </p>
        <LoginLink />
      </AuthError>
    );
  }

  if (error === 'accessdenied') {
    return (
      <AuthError>
        <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
          Access denied
        </h2>
        <p className="mt-4 text-gray-500 text-center">
          You don't have permission to sign in.
        </p>
        <LoginLink />
      </AuthError>
    );
  }

  if (error === 'verification') {
    return (
      <AuthError>
        <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
          Unable to sign in
        </h2>
        <p className="mt-4 text-gray-500 text-center">
          The sign in link is no longer valid. It may habe already been used or
          it may have expired.
        </p>
        <LoginLink />
      </AuthError>
    );
  } else {
    return (
      <AuthError>
        <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
          Something went wrong
        </h2>
        <p className="mt-4 text-gray-500 text-center">
          An error occurred while trying to authenticate.
        </p>
        <LoginLink />
      </AuthError>
    );
  }
}
