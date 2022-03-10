import React from 'react';
import {
  classNames,
  formatAge,
  formatGender,
  formatPhoneNumber,
  formatToMoney,
} from '../utils/misc';
import useEscapeKeydownClose from '../hooks/useEscapeKeydownClose';
import useOutsideClickClose from '../hooks/useOutsideClickClose';
import { Event, Race, Registration } from '../interfaces';
import UpdateRegistration from './UpdateRegistration';

type Props = {
  event: Event;
  races: Race[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  registration: Registration | undefined;
};

export default function RegistrationSidebar({
  event,
  races,
  isOpen,
  setIsOpen,
  registration,
}: Props) {
  const [updateActive, setUpdateActive] = React.useState(false);
  const sidebarRef = React.useRef<HTMLDivElement>(null);
  useOutsideClickClose(isOpen, setIsOpen, sidebarRef, () => {
    setUpdateActive(false);
  });
  useEscapeKeydownClose(isOpen, setIsOpen, () => {
    setUpdateActive(false);
  });

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'inherit';
    };
  }, [isOpen]);

  const handleTriggerUpdateClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setUpdateActive(true);
  };

  const handleSidebarClose = () => {
    setUpdateActive(false);
    setIsOpen(false);
  };

  return (
    <>
      <div
        className={
          isOpen
            ? 'block fixed top-0 left-0 w-full h-screen bg-black/40'
            : 'hidden'
        }
      />
      <div
        ref={sidebarRef}
        className={classNames(
          'fixed top-0 right-0 h-screen max-w-md 2xl:max-w-lg w-full bg-white shadow-lg shadow-black/20 transition-all duration-300 ease-linear',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        aria-hidden={!isOpen}
      >
        <div className="py-8 px-6 sm:px-10">
          <button
            type="button"
            onClick={handleSidebarClose}
            className="h-6 w-6 absolute top-4 right-4 inline-flex justify-center items-center text-gray-600 hover:text-black rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Close sidebar</span>
          </button>
          <div>
            <p className="text-lg font-semibold text-gray-900">
              Registration #{registration?.id}
            </p>
            <p className="text-sm text-gray-600">May 5th, 2022 at 9:34am</p>
          </div>
        </div>

        {updateActive && registration ? (
          <UpdateRegistration
            event={event}
            races={races}
            registration={registration}
            setUpdateActive={setUpdateActive}
          />
        ) : (
          <>
            <div className="pt-6 pb-7 px-6 sm:px-10 h-[calc(100vh-210px)] overflow-y-auto border-t border-gray-200">
              <div>
                <h3 className="mb-1.5 font-medium tracking-tight">
                  Participant information
                </h3>
                <div className="flex">
                  <p className="w-20 text-sm text-gray-500">Name:</p>
                  <p className="mt-0.5 text-sm text-gray-900">
                    {registration?.firstName} {registration?.lastName}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-20 text-sm text-gray-500">Email:</p>
                  <p className="mt-0.5 text-sm text-gray-900">
                    <a
                      href={`mailto:${registration?.email}`}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline hover:text-sky-600 focus-visible:underline focus-visible:text-sky-600 focus:outline-none"
                    >
                      {registration?.email}
                    </a>
                  </p>
                </div>
                <div className="flex">
                  <p className="w-20 text-sm text-gray-500">Phone:</p>
                  <p className="mt-0.5 text-sm text-gray-900">
                    {registration && formatPhoneNumber(registration.phone)}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-20 text-sm text-gray-500">From:</p>
                  <p className="mt-0.5 text-sm text-gray-900">
                    {registration?.city}, {registration?.state}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-20 text-sm text-gray-500">Gender:</p>
                  <p className="mt-0.5 text-sm text-gray-900">
                    {registration && formatGender(registration.gender)}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-20 text-sm text-gray-500">Age:</p>
                  <p className="mt-0.5 text-sm text-gray-900">
                    {registration &&
                      formatAge(registration.birthday, event.dates[0])}
                  </p>
                </div>
                {registration?.guardian && (
                  <div className="flex">
                    <p className="w-20 text-sm text-gray-500">Guardian:</p>
                    <p className="mt-0.5 text-sm text-gray-900">
                      {registration.guardian}
                    </p>
                  </div>
                )}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-medium tracking-tight">Events</h3>
                  {registration?.races.map(r => (
                    <p
                      key={r.id}
                      className="mt-2 text-sm text-gray-900 leading-snug"
                    >
                      {r.name}
                    </p>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="mb-1.5 font-medium tracking-tight">
                    Payment summary
                  </h3>
                  <div className="flex">
                    <p className="w-24 text-sm text-gray-500">Subtotal:</p>
                    <p className="mt-0.5 text-sm text-gray-900">
                      {registration &&
                        formatToMoney(registration.summary.subtotal, true)}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="w-24 text-sm text-gray-500">Trail fee:</p>
                    <p className="mt-0.5 text-sm text-gray-900">
                      {registration &&
                        formatToMoney(registration.summary.trailFee, true)}
                    </p>
                  </div>
                  {registration?.summary.isdraFee && (
                    <div className="flex">
                      <p className="w-24 text-sm text-gray-500">ISDRA fee:</p>
                      <p className="mt-0.5 text-sm text-gray-900">
                        {registration &&
                          formatToMoney(registration.summary.isdraFee, true)}
                      </p>
                    </div>
                  )}
                  <div className="flex">
                    <p className="w-24 text-sm text-gray-500">Total:</p>
                    <p className="mt-0.5 text-sm text-gray-900">
                      {registration &&
                        formatToMoney(registration.summary.total, true)}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="w-24 text-sm text-gray-500">Stripe Fee:</p>
                    <p className="mt-0.5 text-sm text-gray-900">
                      {registration &&
                        formatToMoney(registration.summary.stripeFee, true)}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="w-24 text-sm text-gray-500">Net:</p>
                    <p className="mt-0.5 text-sm text-gray-900">
                      {registration &&
                        formatToMoney(
                          registration.summary.total -
                            registration.summary.stripeFee,
                          true
                        )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-8 px-6 sm:px-10 absolute bottom-0 right-0 left-0 border-t border-gray-200 bg-white">
              <button
                type="button"
                onClick={handleTriggerUpdateClick}
                className="px-3 py-2 w-full flex justify-center items-center border border-gray-300 shadow-sm text-center text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:text-gray-900 hover:border-gray-400/60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-600"
              >
                Update registration
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
