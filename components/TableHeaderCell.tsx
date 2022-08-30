import { TableProps } from '../interfaces';
import { classNames } from '../utils/misc';

export default function TH({ children = '', className = '' }: TableProps) {
  return (
    <th
      className={classNames(
        'px-2 first:pl-5 last:pr-5 py-2.5 border-b border-gray-200 text-left text-gray-900 text-sm font-normal first:rounded-tl last:rounded-tr',
        className
      )}
    >
      {children}
    </th>
  );
}
