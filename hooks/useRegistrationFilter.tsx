import React from 'react';
import { Gender, Registration, SortBy, SortDirection } from '../interfaces';
import { registrationSearch } from '../utils/search';
import { registrationSort } from '../utils/sort';
import { registrationFilter } from '../utils/filter';

export default function useRegistrationFilter(registrations: Registration[]) {
  const [filteredRegistrations, setFilteredRegistrations] =
    React.useState(registrations);
  const [sortBy, setSortBy] = React.useState<SortBy>('lastName');
  const [sortDirection, setSortDirection] =
    React.useState<SortDirection>('ascending');
  const [query, setQuery] = React.useState('');
  const [gender, setGender] = React.useState<Gender>('all');
  const [raceId, setRaceId] = React.useState('all');

  React.useEffect(() => {
    const filterResult = registrations
      .filter(registration =>
        registrationSearch<Registration>(
          registration,
          ['firstName', 'lastName'],
          query
        )
      )
      .sort((registrationA, registrationB) =>
        registrationSort(registrationA, registrationB, {
          property: sortBy,
          isDescending: sortDirection === 'descending',
        })
      )
      .filter(registration =>
        registrationFilter(registration, [
          { property: 'gender', value: gender },
          { property: 'races', value: raceId },
        ])
      );

    setFilteredRegistrations(filterResult);
  }, [gender, query, raceId, registrations, sortBy, sortDirection]);

  return {
    registrations: filteredRegistrations,
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
  };
}
