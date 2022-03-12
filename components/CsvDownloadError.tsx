import React from 'react';
import useOutsideClickClose from '../hooks/useOutsideClickClose';
import useEscapeKeydownClose from '../hooks/useEscapeKeydownClose';
import usePreventYScroll from '../hooks/usePreventYScroll';

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CsvDownloadError({ isOpen, setIsOpen }: Props) {
  const modalRef = React.useRef<HTMLDivElement>(null);
  useOutsideClickClose(isOpen, setIsOpen, modalRef);
  useEscapeKeydownClose(isOpen, setIsOpen);
  usePreventYScroll(isOpen);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  return (
    <div className="px-6 absolute top-0 left-0 w-full h-screen flex justify-center items-center bg-black/70">
      <div
        ref={modalRef}
        className="p-8 pb-10 flex flex-col items-center max-w-md w-full bg-white shadow rounded-md"
      >
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
          Download Error
        </h3>
        <p className="mt-2 text-gray-700 xxs:w-80 text-center">
          Failed to download the CSV file. Please try again or{' '}
          <a
            href="mailto:support@seanhasenstein.com"
            target="_blank"
            rel="noreferrer"
            className="text-sky-700 underline"
          >
            contact the site maintainer
          </a>
          .
        </p>
        <button
          type="button"
          onClick={e => handleClick(e)}
          className="mt-5 py-1.5 px-6 flex justify-center items-center text-sm sm:text-base bg-gray-900 border border-black text-gray-100 rounded-md shadow-sm hover:bg-gray-800 transition-colors focus:outline-none focus-visible:ring-2 focus:ring-offset-2 focus:ring-sky-600"
        >
          Close this message
        </button>
      </div>
    </div>
  );
}
