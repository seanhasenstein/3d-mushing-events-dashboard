import Link from 'next/link';

export default function NavSidebar() {
  return (
    <div className="py-7 lg:py-12 lg:w-64 xl:w-72 px-7 lg:fixed lg:h-screen flex lg:flex-col justify-between bg-gray-900">
      <div className="flex flex-col sm:flex-row justify-between lg:flex-col w-full">
        <h3 className="lg:mb-10 text-center sm:text-left text-xl font-semibold text-gray-200">
          3D Mushing Events
        </h3>
        <nav className="mt-5 sm:mt-0 flex justify-center gap-x-10 lg:flex-col">
          <Link href="/">
            <a className="lg:mb-5 text-gray-400 hover:text-white outline-none focus-visible:text-sky-500 focus-visible:underline">
              Fall Event
            </a>
          </Link>
          <Link href="/">
            <a className="text-gray-400 hover:text-white outline-none focus-visible:text-sky-500 focus-visible:underline">
              Winter Event
            </a>
          </Link>
        </nav>
      </div>
      <div className="hidden lg:block">
        <button
          type="button"
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
  );
}