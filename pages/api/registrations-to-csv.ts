import { NextApiResponse } from 'next';
import nc from 'next-connect';
import { createObjectCsvStringifier } from 'csv-writer';
import { format, utcToZonedTime } from 'date-fns-tz';
import { withAuth } from '../../utils/auth';
import database from '../../middleware/db';
import { event } from '../../db';
import { ExtendRequest } from '../../interfaces';
import { formatAge, formatPhoneNumber, formatToMoney } from '../../utils/misc';

const handler = nc<ExtendRequest, NextApiResponse>()
  .use(database)
  .get(async (req, res) => {
    const fetchedEvent = await event.getEventById(req.db, req.query.eventId);
    const { registrations } = fetchedEvent;

    const header = [
      { id: 'id', title: 'ID' },
      { id: 'date', title: 'DATE' },
      { id: 'firstName', title: 'FIRST NAME' },
      { id: 'lastName', title: 'LAST NAME' },
      { id: 'email', title: 'EMAIL' },
      { id: 'phone', title: 'PHONE' },
      { id: 'city', title: 'CITY' },
      { id: 'state', title: 'STATE' },
      { id: 'gender', title: 'GENDER' },
      { id: 'age', title: 'AGE' },
      { id: 'guardian', title: 'GUARDIAN' },
      { id: 'total', title: 'TOTAL' },
      { id: 'stripeFee', title: 'STRIPE FEE' },
      { id: 'net', title: 'NET' },
    ];

    const csvStringifier = createObjectCsvStringifier({ header });
    const blankRow = header.map(h => ({ [h.id]: '' }));

    type RaceReducer = {
      id: string;
      raceName: string;
      registrations: any[];
    }[];

    const accumulator: RaceReducer = fetchedEvent.races.map(r => ({
      id: r.id,
      raceName: r.name,
      registrations: [],
    }));

    const raceReducer = registrations.reduce(
      (accumulator, currentRegistration) => {
        currentRegistration.races.forEach(r => {
          const zonedDate = utcToZonedTime(
            new Date(currentRegistration.createdAt),
            'America/Chicago'
          );
          const createdAt = format(zonedDate, 'Pp', {
            timeZone: 'America/Chicago',
          });

          const formattedRegistration = {
            id: currentRegistration.id,
            date: createdAt,
            firstName: currentRegistration.firstName,
            lastName: currentRegistration.lastName,
            email: currentRegistration.email,
            phone: formatPhoneNumber(currentRegistration.phone),
            city: currentRegistration.city,
            state: currentRegistration.state,
            gender: currentRegistration.gender === 'female' ? 'F' : 'M',
            age: formatAge(currentRegistration.birthday, fetchedEvent.dates[0]),
            guardian: currentRegistration.guardian,
            total: formatToMoney(currentRegistration.summary.total, true),
            stripeFee: formatToMoney(
              currentRegistration.summary.stripeFee,
              true
            ),
            net: formatToMoney(
              currentRegistration.summary.total -
                currentRegistration.summary.stripeFee,
              true
            ),
          };

          const updatedAccumulator = accumulator.map(a => {
            if (a.id === r.id) {
              return {
                ...a,
                registrations: [...a.registrations, formattedRegistration],
              };
            }
            return a;
          });
          accumulator = updatedAccumulator;
        });
        return accumulator;
      },
      accumulator
    );

    const records = raceReducer.reduce(
      (accumulator: Record<string, unknown>[], currentRace) => {
        const raceHeaderRow = { [header[0].id]: currentRace.raceName };

        const sortedRegistrations = currentRace.registrations.sort(
          (regA, regB) => {
            if (regA.lastName > regB.lastName) return 1;
            if (regA.lastName < regB.lastName) return -1;
            if (regA.lastName === regB.lastName) {
              if (regA.firstName > regB.firstName) return 1;
              if (regA.firstName < regB.firstName) return -1;
            }
            return 0;
          }
        );

        return [
          ...accumulator,
          raceHeaderRow,
          ...sortedRegistrations,
          { ...blankRow },
          { ...blankRow },
        ];
      },
      []
    );

    const csv = `${csvStringifier.getHeaderString()} ${csvStringifier.stringifyRecords(
      records
    )}`;
    res.json({ csv, raceReducer });
  });

export default withAuth(handler);
