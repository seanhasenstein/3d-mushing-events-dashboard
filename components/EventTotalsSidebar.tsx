import React from 'react';
import { classNames } from '../utils/misc';
import useEscapeKeydownClose from '../hooks/useEscapeKeydownClose';
import useOutsideClickClose from '../hooks/useOutsideClickClose';
import { Event } from '../interfaces';

type Props = {
  events: Event[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EventTotalsSidebar({
  events,
  isOpen,
  setIsOpen,
}: Props) {
  const sidebarRef = React.useRef<HTMLDivElement>(null);
  useOutsideClickClose(isOpen, setIsOpen, sidebarRef);
  useEscapeKeydownClose(isOpen, setIsOpen);

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
        className={classNames(
          'py-8 px-6 xxs:px-10 absolute max-w-md bg-white border border-gray-200 shadow-lg lg:rounded-md transition-opacity',
          isOpen ? 'top-0 right-0 w-full lg:top-14 lg:right-4' : 'hidden'
        )}
      >
        <div ref={sidebarRef} className={''}>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="h-5 w-5 absolute top-4 right-4 inline-flex justify-center items-center text-gray-500 hover:text-black rounded-full"
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
              Total participants per event
            </p>
          </div>
          <div className="mt-4">
            {events.map(e => (
              <div
                key={e.id}
                className="py-2 flex justify-between items-center gap-x-6 text-sm text-gray-900 border-b first:border-t border-gray-200"
              >
                <p>{e.title}</p>
                <p>1</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
