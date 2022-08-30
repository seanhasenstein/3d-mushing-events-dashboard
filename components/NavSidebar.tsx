import { useRouter } from 'next/router';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

export default function NavSidebar() {
  const router = useRouter();

  const eventLinks = {
    fall: '/dotys-dusty-dog-dryland-race',
    winter: '/dotys-dog-days-of-winter-race',
  };

  return (
    <>
      <div className="lg:hidden bg-black flex justify-end">
        <button
          type="button"
          onClick={() => signOut()}
          className="py-1.5 px-3 text-gray-600 text-sm focus:outline-none focus-visible:text-gray-400 focus-visible:underline"
        >
          Logout
        </button>
      </div>
      <div className="py-7 lg:py-12 lg:w-64 xl:w-72 px-7 lg:fixed lg:h-screen flex lg:flex-col justify-between bg-gray-900">
        <div className="flex flex-col sm:flex-row justify-between lg:flex-col w-full">
          <h3 className="lg:mb-10 text-center sm:text-left text-xl font-semibold text-gray-200">
            <Link href="/">3D Mushing Events</Link>
          </h3>
          <nav className="mt-5 sm:mt-0 flex justify-center items-center gap-x-3 lg:flex-col">
            <Link href="/dotys-dusty-dog-dryland-race">
              <a
                className={`${
                  router.pathname === eventLinks.fall
                    ? 'bg-black/70 text-white '
                    : ''
                }py-2 px-4 lg:w-full rounded-md text-gray-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-600 focus-visible:ring-offset-gray-900`}
              >
                Fall event
              </a>
            </Link>
            <Link href="/dotys-dog-days-of-winter-race">
              <a
                className={`${
                  router.pathname === eventLinks.winter
                    ? 'bg-black/70 text-white '
                    : ''
                }lg:mt-2 py-2 px-4 lg:w-full rounded-md text-gray-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-600 focus-visible:ring-offset-gray-900`}
              >
                Winter event
              </a>
            </Link>
          </nav>
        </div>
        <div className="hidden lg:block">
          <button
            type="button"
            onClick={() => signOut()}
            className="py-2 px-4 w-full flex justify-center items-center bg-white/5 border-t border-gray-700/50 rounded shadow-sm text-[15px] text-gray-300 leading-3 hover:border-white/10 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 focus-visible:ring-offset-gray-900"
          >
            Logout
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1.5 h-3.5 w-3.5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
