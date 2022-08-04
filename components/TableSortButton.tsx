import { SortBy, SortDirection } from '../interfaces';
import { classNames } from '../utils/misc';

type SortButtonProps = {
  label: string;
  sortBy: SortBy;
  activeSortBy: SortBy;
  sortDirection: SortDirection;
  setSortBy: React.Dispatch<React.SetStateAction<SortBy>>;
  setSortDirection: React.Dispatch<React.SetStateAction<SortDirection>>;
};

export default function SortButton({
  label,
  sortBy,
  activeSortBy,
  sortDirection,
  setSortBy,
  setSortDirection,
}: SortButtonProps) {
  const handleClick = () => {
    if (sortBy === activeSortBy) {
      setSortDirection(
        sortDirection === 'ascending' ? 'descending' : 'ascending'
      );
    }
    setSortBy(sortBy);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center outline-none focus-visible:text-sky-600 focus-visible:underline"
    >
      {label}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={classNames(
          'ml-2 h-4 w-4 text-gray-800 rounded',
          sortBy === activeSortBy
            ? 'bg-gray-300'
            : 'bg-bg-transparent text-transparent',
          sortDirection === 'ascending' ? '' : 'rotate-180'
        )}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}
