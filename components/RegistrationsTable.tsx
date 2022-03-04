import React from 'react';
import { formatAge, formatDate, formatGender } from '../utils/misc';
import { Race, Registration, SortBy, SortDirection } from '../interfaces';
import SortButton from './TableSortButton';
import TH from './TableHeaderCell';
import TD from './TableDataCell';

type Props = {
  race: Race;
  registrations: Registration[] | undefined;
  setEventTotalsSidebarIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRegistrationSidebarIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSidebarRegistration: React.Dispatch<
    React.SetStateAction<Registration | undefined>
  >;
};

export default function RegistrationsTable({
  race,
  registrations,
  setEventTotalsSidebarIsOpen,
  setRegistrationSidebarIsOpen,
  setSidebarRegistration,
}: Props) {
  const [sortBy, setSortBy] = React.useState<SortBy>('date');
  const [sortDirection, setSortDirection] =
    React.useState<SortDirection>('ascending');

  const handleViewClick = (id: string) => {
    const registration = registrations?.find(r => r._id === id);
    if (!registration) return;
    setSidebarRegistration(registration);
    setRegistrationSidebarIsOpen(true);
  };

  return (
    <div className="relative lg:static px-3">
      <div className="absolute top-6 right-6 flex">
        <button
          type="button"
          className="pr-4 flex items-center text-sm font-medium text-gray-700 transition-colors hover:text-black outline-none focus-visible:text-sky-600 focus-visible:underline group"
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
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Export to csv
        </button>
        <button
          type="button"
          onClick={() => setEventTotalsSidebarIsOpen(true)}
          className="pl-4 flex items-center border-l border-gray-200 text-sm font-medium text-gray-700 transition-colors hover:text-black leading-none outline-none focus-visible:text-sky-600 focus-visible:underline group"
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
          Event totals
        </button>
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
          {race.name}
        </h2>
        <p className="text-gray-700">{race.dates}</p>
      </div>
      <div className="mt-10 w-full shadow rounded-md border border-gray-200">
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
                Event
              </label>
              <select
                name="event"
                id="event"
                className="mt-2 py-2 pr-10 pl-3 sm:px-3 w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm border border-gray-300 rounded-md"
              >
                <option value="all">All</option>
                {race.events.map(e => (
                  <option key={e.id} value={e.id}>
                    {e.title}
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
                    sortBy="date"
                    activeSortBy={sortBy}
                    sortDirection={sortDirection}
                    setSortBy={setSortBy}
                    setSortDirection={setSortDirection}
                  />
                </TH>
                <TH>
                  <SortButton
                    label="Name"
                    sortBy="name"
                    activeSortBy={sortBy}
                    sortDirection={sortDirection}
                    setSortBy={setSortBy}
                    setSortDirection={setSortDirection}
                  />
                </TH>
                <TH className="pl-6 text-center">
                  <SortButton
                    label="Age"
                    sortBy="age"
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
              {registrations?.map(r => (
                <tr key={r._id} className="group">
                  <TD>{formatDate(r.createdAt, 'MM/dd/yyyy')}</TD>
                  <TD>
                    <div>
                      <button
                        type="button"
                        onClick={() => handleViewClick(r._id)}
                        className="font-medium text-black text-left hover:underline outline-none focus-visible:text-sky-600 focus-visible:underline"
                      >
                        {r.firstName} {r.lastName}
                      </button>
                      <p className="text-gray-600">
                        {r.city}, {r.state}
                      </p>
                    </div>
                  </TD>
                  <TD className="text-center">{formatAge(r.birthday)}</TD>
                  <TD className="text-center">{formatGender(r.gender)}</TD>
                  <TD>
                    {r.events.map(e => (
                      <p
                        key={e.id}
                        className="mt-2 xl:mt-1 first:mt-0 text-[0.8125rem] leading-snug"
                      >
                        {e.title}
                      </p>
                    ))}
                  </TD>
                  <TD>
                    <button
                      type="button"
                      onClick={() => handleViewClick(r._id)}
                      className="text-sky-600 font-medium transition-all hover:text-sky-900 outline-none focus-visible:underline"
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
          {registrations?.map(r => (
            <button
              key={r._id}
              onClick={() => handleViewClick(r._id)}
              className="py-4 px-6 flex justify-between items-center w-full bg-white border-b border-gray-200 text-left"
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
                  {formatAge(r.birthday)} years old
                </p>
                <div className="mt-0.5">
                  {r.events.map(e => (
                    <p key={e.id} className="mt-2 first:mt-0 leading-snug">
                      {e.title}
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
      <div className="mt-1 mb-2 py-5 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-700">Showing 1 to 10 of 97 results</p>
        </div>
        <div className="flex items-center shadow-sm">
          <button className="h-9 w-9 inline-flex justify-center items-center bg-white border border-gray-300 rounded-l-md hover:text-black hover:border-gray-400/75 hover:z-50 focus:z-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button className="-ml-px h-9 w-9 inline-flex justify-center items-center text-gray-600 border border-gray-300 text-sm bg-gray-200/75 focus:z-50">
            1
          </button>
          <button className="-ml-px h-9 w-9 inline-flex justify-center items-center text-gray-600 border border-gray-300 text-sm bg-white hover:text-black hover:border-gray-400/75 hover:z-50 focus:z-50">
            2
          </button>
          <div className="-ml-px h-9 w-9 inline-flex justify-center items-center text-gray-600 border border-gray-300 text-sm bg-white">
            ...
          </div>
          <button className="-ml-px h-9 w-9 inline-flex justify-center items-center text-gray-600 border border-gray-300 text-sm bg-white hover:text-black hover:border-gray-400/75 hover:z-50 focus:z-50">
            6
          </button>
          <button className="-ml-px h-9 w-9 inline-flex justify-center items-center text-gray-600 border border-gray-300 text-sm bg-white hover:text-black hover:border-gray-400/75 hover:z-50 focus:z-50">
            7
          </button>
          <button className="-ml-px h-9 w-9 inline-flex justify-center items-center bg-white border border-gray-300 rounded-r-md hover:text-black hover:border-gray-400/75 hover:z-50 focus:z-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
