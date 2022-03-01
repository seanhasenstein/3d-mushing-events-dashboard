import type { NextApiRequest, NextApiResponse } from 'next';
import { faker } from '@faker-js/faker';
import { Registration } from '../../interfaces';
import { createReceiptNumber, requiresGuardian } from '../../utils/misc';
import { winterEvents } from '../../data/events';

type Data = {
  registrations: Registration[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  function buildRegistration(index: number): Registration {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const birthday = faker.date
      .between(`${new Date('1-1-1972')}`, `${new Date('1-1-2014')}`)
      .toString();
    const guardian = requiresGuardian(new Date(birthday))
      ? { firstName: faker.name.firstName(), lastName: faker.name.lastName() }
      : undefined;
    const date = faker.date.past().toString();
    const total = Math.random() * 10000;

    return {
      _id: faker.random.alphaNumeric(24),
      registrationId: createReceiptNumber(),
      eventId: 'winter-2023',
      firstName,
      lastName,
      birthday,
      guardian,
      gender: Math.round(Math.random()) > 0.5 ? 'male' : 'female',
      email: faker.internet.email(firstName, lastName).toLowerCase(),
      phone: faker.phone.phoneNumber('##########'),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      events: [winterEvents[index]],
      total,
      stripeFee: Math.ceil(total) * 0.029 + 30,
      createdAt: date,
      updatedAt: date,
    };
  }

  const registrations = Array(20)
    .fill('')
    .map((_, i) => {
      return buildRegistration(i);
    });

  res.status(200).json({ registrations });
}
