import React from 'react';
import { classNames } from '../utils/misc';
import useEscapeKeydownClose from '../hooks/useEscapeKeydownClose';
import useOutsideClickClose from '../hooks/useOutsideClickClose';
import { Race } from '../interfaces';

type Props = {
  raceTotals: Race[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EventTotalsSidebar({
  raceTotals,
  isOpen,
  setIsOpen,
}: Props) {
  const sidebarRef = React.useRef<HTMLDivElement>(null);
  useOutsideClickClose(isOpen, setIsOpen, sidebarRef);
  useEscapeKeydownClose(isOpen, setIsOpen);
  const [sortedRaces] = React.useState(() => {
    return raceTotals.reduce(
      (accumulator: Record<string, Race[]>, currentRace) => {
        accumulator[currentRace.sled] = [
          ...(accumulator[currentRace.sled] || []),
          currentRace,
        ];
        return accumulator;
      },
      {}
    );
  });
  const [activeRace, setActiveRace] = React.useState<string>();

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'inherit';
    };
  }, [isOpen]);

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
          'py-8 px-6 xxs:px-12 fixed top-0 right-0 max-w-[420px] w-full h-screen overflow-y-auto bg-white border border-gray-200 shadow-lg transition-all duration-300 ease-linear',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        aria-hidden={!isOpen}
      >
        <div ref={sidebarRef}>
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold text-gray-900">
              Race participant totals
            </p>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="h-5 w-5 inline-flex justify-center items-center text-gray-500 hover:text-black rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4.5 w-4.5"
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
          </div>
          <div className="mt-7">
            {Object.keys(sortedRaces).map(key => (
              <div
                key={key}
                className="text-sm border-b first:border-t border-gray-200"
              >
                <button
                  type="button"
                  onClick={() => {
                    if (activeRace === key) {
                      setActiveRace(undefined);
                    } else {
                      setActiveRace(key);
                    }
                  }}
                  className={`py-3 w-full flex justify-between items-center font-semibold text-gray-900
                  }`}
                >
                  {key}
                  {activeRace === key ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
                <div>
                  {sortedRaces[key].map(race => (
                    <div
                      key={race.id}
                      className={`py-1.5 first:pt-0.5 last:pb-3.5 pl-2 flex justify-between gap-10${
                        activeRace === key ? '' : ' hidden'
                      }`}
                    >
                      <p className="text-gray-600">
                        {race.category}
                        {race.breed ? ` - ${race.breed}` : null}
                      </p>
                      <p>{race.total}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
