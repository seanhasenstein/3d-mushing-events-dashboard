import Layout from '../components/Layout';

export default function FiveHundredError() {
  return (
    <Layout>
      <div className="my-1 mx-auto p-4 pb-5 max-w-lg flex flex-col items-center lg:inline-flex lg:flex-row lg:items-start bg-white shadow rounded-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mt-0.5 lg:mr-3.5 flex-shrink-0 h-6 w-6 lg:h-5 lg:w-5 text-red-700"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        <p className="mt-2 lg:mt-0 max-w-lg text-gray-700 text-center lg:text-left">
          An error has occurred. Please refresh and try again. If the issue
          continues please{' '}
          <a
            href="mailto:support@seanhasenstein.com"
            target="_blank"
            rel="noreferrer"
            className="text-sky-600 underline"
          >
            contact Sean
          </a>
          .
        </p>
      </div>
    </Layout>
  );
}
