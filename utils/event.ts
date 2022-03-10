import { Event } from '../interfaces';

export function getRaceTotals(event: Event) {
  const accumulator = event?.races.map(r => ({ ...r, total: 0 }));

  const raceTotals = event?.registrations.reduce(
    (accumulator, currentRegistration) => {
      currentRegistration.races.forEach(race => {
        accumulator = accumulator?.map(a => {
          if (a.id === race.id) {
            return { ...a, total: a.total + 1 };
          }
          return a;
        });
      });
      return accumulator;
    },
    accumulator
  );

  return raceTotals;
}
