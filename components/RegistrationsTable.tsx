import React from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { Event, Gender, Registration } from '../interfaces';
import { formatAge, formatDate, formatGender } from '../utils/misc';
import useRegistrationFilter from '../hooks/useRegistrationFilter';
import useCsvDownload from '../hooks/useCsvDownload';
import SortButton from './TableSortButton';
import TH from './TableHeaderCell';
import TD from './TableDataCell';
import CsvDownloadError from './CsvDownloadError';

type Props = {
  event: Event;
  setEventTotalsSidebarIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRegistrationSidebarIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSidebarRegistration: React.Dispatch<
    React.SetStateAction<Registration | undefined>
  >;
};

export default function RegistrationsTable({
  event,
  setEventTotalsSidebarIsOpen,
  setRegistrationSidebarIsOpen,
  setSidebarRegistration,
}: Props) {
  const {
    registrations,
    gender,
    setGender,
    query,
    setQuery,
    raceId,
    setRaceId,
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
  } = useRegistrationFilter(event.registrations);
  const { csvLinkRef, csvStatus, handleCsvClick, csvError, setCsvError } =
    useCsvDownload(event);

  const handleViewClick = (id: string) => {
    const registration = registrations.find(r => r.id === id);
    if (!registration) return;
    setSidebarRegistration(registration);
    setRegistrationSidebarIsOpen(true);
  };

  return (
    <>
      <div className="relative lg:static px-3">
        <div className="flex flex-col justify-between">
          <div className="flex flex-col lg:flex-row items-center text-center lg:text-left">
            <Image
              src={`${event.logo}`}
              alt={event.name}
              height={80}
              width={80}
            />
            <div className="mt-3 lg:mt-0 lg:ml-4">
              <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
                {event.name}
              </h2>
              <p className="mt-1 text-gray-700">
                {event.dates.map((d, i) => {
                  const date = format(new Date(d), 'EEE LLL do');

                  if (i === 0) {
                    return `${date} - `;
                  }
                  return date;
                })}
                , {new Date(event.dates[0]).getFullYear()}
              </p>
            </div>
          </div>
          <div className="mt-6 lg:mt-0 relative lg:absolute lg:top-6 lg:right-6 flex justify-center lg:justify-end">
            {csvStatus === 'success' ? (
              <div className="absolute top-12 lg:static lg:mr-4 inline-flex items-center text-sm text-gray-900 font-medium">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1.5 h-4 w-4 text-emerald-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Download successful
              </div>
            ) : null}

            <button
              type="button"
              onClick={handleCsvClick}
              className="mr-3 py-1.5 px-2.5 xxs:px-4 xxs:mr-4 flex items-center border border-gray-200 rounded-md bg-white shadow-sm text-sm font-medium text-gray-700 transition-colors hover:text-black hover:border-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-600"
            >
              {csvStatus === 'loading' ? (
                'Loading...'
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0 mr-1 h-3.5 w-3.5 text-gray-500 group-focus-visible:text-sky-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Export to csv
                </>
              )}
            </button>
            <a ref={csvLinkRef} className="hidden" aria-hidden="true">
              Download registration csv
            </a>
            <button
              type="button"
              onClick={() => setEventTotalsSidebarIsOpen(true)}
              className="py-1.5 px-4 flex items-center border border-gray-200 rounded-md bg-white shadow-sm text-sm font-medium text-gray-700 transition-colors hover:text-black hover:border-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0 mr-1 h-3.5 w-3.5 text-gray-500 group-focus-visible:text-sky-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
              Race totals
            </button>
          </div>
        </div>
        {registrations.length > 0 && (
          <>
            <div className="mt-14 lg:mt-10 mb-1 w-full shadow rounded-md border border-gray-200">
              <div className="py-6 px-5 flex flex-col md:flex-row lg:flex-col xl:flex-row justify-between gap-x-4 xl:gap-x-6 border-b border-gray-200">
                <div className="w-full flex flex-col">
                  <label
                    htmlFor="search"
                    className="text-sm font-medium text-gray-800"
                  >
                    Search for a registration
                  </label>
                  <div className="mt-2 w-full relative">
                    <div className="absolute top-2.5 left-2.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="search"
                      id="search"
                      placeholder="Search"
                      value={query}
                      onChange={e => setQuery(e.target.value)}
                      className="py-2 pr-3 pl-9 w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="mt-4 md:mt-0 lg:mt-4 xl:mt-0 relative flex flex-col sm:flex-row sm:gap-x-4 xl:gap-x-6 flex-shrink-0">
                  <div className="flex flex-col sm:w-1/3 md:w-[6rem] lg:w-5/12 xl:w-[6rem]">
                    <label
                      htmlFor="gender"
                      className="text-sm font-medium text-gray-800"
                    >
                      Gender
                    </label>
                    <select
                      name="gender"
                      id="gender"
                      value={gender}
                      onChange={e => setGender(e.target.value as Gender)}
                      className="mt-2 py-2 px-3 w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border border-gray-300 rounded-md"
                    >
                      <option value="all">All</option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                    </select>
                  </div>
                  <div className="mt-4 sm:mt-0 flex flex-col sm:w-2/3 md:w-[21rem] lg:w-7/12 xl:w-[22rem]">
                    <label
                      htmlFor="events"
                      className="text-sm font-medium text-gray-800"
                    >
                      Race
                    </label>
                    <select
                      name="race"
                      id="race"
                      value={raceId}
                      onChange={e => setRaceId(e.target.value)}
                      className="mt-2 py-2 pr-10 pl-3 sm:px-3 w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border border-gray-300 rounded-md"
                    >
                      <option value="all">All</option>
                      {event.races.map(r => (
                        <option key={r.id} value={r.id}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <table className="w-full">
                  <thead>
                    <tr className="group">
                      <TH>
                        <SortButton
                          label="Date"
                          sortBy="createdAt"
                          activeSortBy={sortBy}
                          sortDirection={sortDirection}
                          setSortBy={setSortBy}
                          setSortDirection={setSortDirection}
                        />
                      </TH>
                      <TH>
                        <SortButton
                          label="Name"
                          sortBy="lastName"
                          activeSortBy={sortBy}
                          sortDirection={sortDirection}
                          setSortBy={setSortBy}
                          setSortDirection={setSortDirection}
                        />
                      </TH>
                      <TH className="pl-6 text-center">
                        <SortButton
                          label="Age"
                          sortBy="birthday"
                          activeSortBy={sortBy}
                          sortDirection={sortDirection}
                          setSortBy={setSortBy}
                          setSortDirection={setSortDirection}
                        />
                      </TH>
                      <TH className="pl-6 text-center">
                        <SortButton
                          label="Gender"
                          sortBy="gender"
                          activeSortBy={sortBy}
                          sortDirection={sortDirection}
                          setSortBy={setSortBy}
                          setSortDirection={setSortDirection}
                        />
                      </TH>
                      <TH>
                        <SortButton
                          label="Events"
                          sortBy="events"
                          activeSortBy={sortBy}
                          sortDirection={sortDirection}
                          setSortBy={setSortBy}
                          setSortDirection={setSortDirection}
                        />
                      </TH>
                      <TH />
                    </tr>
                  </thead>
                  <tbody>
                    {event.registrations.length === 0 && (
                      <tr className="group">
                        <TD>There are currently 0 registrations</TD>
                        <TD />
                        <TD />
                        <TD />
                        <TD />
                        <TD />
                      </tr>
                    )}
                    {registrations.map(r => (
                      <tr key={r.id} className="group">
                        <TD>{formatDate(r.createdAt, 'MM/dd/yyyy')}</TD>
                        <TD>
                          <div>
                            <button
                              type="button"
                              onClick={() => handleViewClick(r.id)}
                              className="font-medium text-black text-left hover:underline outline-none focus-visible:text-sky-600 focus-visible:underline"
                            >
                              {r.firstName} {r.lastName}
                            </button>
                            <p className="text-gray-600">
                              {r.city}, {r.state}
                            </p>
                          </div>
                        </TD>
                        <TD className="text-center">
                          {formatAge(r.birthday, event.dates[0])}
                        </TD>
                        <TD className="text-center">
                          {formatGender(r.gender)}
                        </TD>
                        <TD>
                          {r.races.map(r => (
                            <p
                              key={r.id}
                              className="mt-2 xl:mt-1 first:mt-0 text-[0.8125rem] leading-snug"
                            >
                              {r.name}
                            </p>
                          ))}
                        </TD>
                        <TD className="text-right">
                          <button
                            type="button"
                            onClick={() => handleViewClick(r.id)}
                            className="py-0.5 px-2.5 text-sky-600 font-medium rounded-full transition-all hover:bg-sky-100 hover:text-sky-700 outline-none focus-visible:underline"
                          >
                            View
                          </button>
                        </TD>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="md:hidden">
                {registrations.map(r => (
                  <button
                    key={r.id}
                    onClick={() => handleViewClick(r.id)}
                    className="py-4 px-6 flex justify-between items-center w-full bg-white border-b border-gray-200 text-left last:rounded-b-md"
                  >
                    <div className="text-sm text-gray-900">
                      <p className="font-medium">
                        {r.firstName} {r.lastName}
                      </p>
                      <p className="mt-0.5">
                        {r.city}, {r.state}
                      </p>
                      <p className="mt-0.5">
                        <span className="capitalize">{r.gender}</span> -{' '}
                        {formatAge(r.birthday, event.dates[0])} years old
                      </p>
                      <div className="mt-0.5">
                        {r.races.map(r => (
                          <p
                            key={r.id}
                            className="mt-2 first:mt-0 leading-snug"
                          >
                            {r.name}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="sr-only">View registration</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-1 mb-2 py-5">
              <p className="text-sm text-gray-700">
                Showing 1 to {registrations.length} of {registrations.length}{' '}
                results
              </p>
            </div>
          </>
        )}
      </div>
      {csvError && (
        <CsvDownloadError isOpen={csvError} setIsOpen={setCsvError} />
      )}
    </>
  );
}
