import Link from 'next/link';
import Layout from '../components/Layout';

export default function FourOhFour() {
  return (
    <Layout>
      <div className="my-1 mx-auto p-8 pb-10 max-w-lg flex flex-col items-center bg-white shadow rounded-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0 h-7 w-7 text-red-700"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        <h3 className="mt-2 text-gray-900 font-bold text-lg uppercase tracking-wide">
          404 Error
        </h3>
        <p className="mt-2 text-gray-700 w-72 text-center">
          The page you are looking for does not exist.
        </p>
        <Link href="/">
          <a className="mt-4 py-1.5 px-4 max-w-xs w-full sm:w-40 flex justify-center items-center bg-gray-900 border border-black text-gray-100 rounded-md shadow-sm hover:bg-gray-800 transition-colors focus:outline-none focus-visible:ring-2 focus:ring-offset-2 focus:ring-sky-600">
            Back to home
          </a>
        </Link>
      </div>
    </Layout>
  );
}
