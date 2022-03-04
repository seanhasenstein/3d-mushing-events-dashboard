import { TableProps } from '../interfaces';
import { classNames } from '../utils/misc';

export default function TD({ children, className = '' }: TableProps) {
  return (
    <td
      className={classNames(
        'py-3 px-2 first:pl-5 last:pr-5 group-last:border-b-0 bg-white text-gray-700 text-sm border-b border-gray-200 group-last:first:rounded-bl-md group-last:last:rounded-br-md',
        className
      )}
    >
      {children}
    </td>
  );
}
