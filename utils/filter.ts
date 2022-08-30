import { Registration } from '../interfaces';

export default interface IFilter<T> {
  property: keyof T;
  value: unknown;
}

export function registrationFilter(
  object: Registration,
  filters: Array<IFilter<Registration>>
) {
  return filters.every(filter => {
    if (filter.value === 'all') {
      return true;
    }

    if (filter.property === 'races') {
      const races: string[] = object.races;
      return races.some(r => r === filter.value);
    }

    return object[filter.property] === filter.value;
  });
}
