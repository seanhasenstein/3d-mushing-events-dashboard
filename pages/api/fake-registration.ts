import type { NextApiRequest, NextApiResponse } from 'next';
import { faker } from '@faker-js/faker';
import { Registration } from '../../interfaces';
import { createReceiptNumber, requiresGuardian } from '../../utils/misc';
import { fallRace, winterRace } from '../../data';

export interface Request extends NextApiRequest {
  query: {
    event: 'fall' | 'winter';
  };
}

type Data = {
  registrations: Registration[];
};

export default function handler(req: Request, res: NextApiResponse<Data>) {
  function buildRegistration(index: number): Registration {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const birthday = faker.date
      .between(`${new Date('1-1-1972')}`, `${new Date('1-1-2014')}`)
      .toString();
    const guardian = requiresGuardian(new Date(birthday))
      ? `${faker.name.firstName()} ${faker.name.lastName()}`
      : undefined;
    const date = faker.date.past().toString();
    const races =
      req.query.event === 'fall' ? fallRace.races : winterRace.races;
    const trailFee = 1400;
    const ISDRAFee = 600;
    const subtotal = 7500 * races.length;
    const total = trailFee + ISDRAFee + subtotal;

    return {
      _id: faker.random.alphaNumeric(24),
      registrationId: createReceiptNumber(),
      firstName,
      lastName,
      birthday,
      guardian,
      gender: Math.round(Math.random()) > 0.5 ? 'male' : 'female',
      email: faker.internet.email(firstName, lastName).toLowerCase(),
      phone: faker.phone.phoneNumber('##########'),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      races: [races[index]],
      summary: {
        subtotal,
        trailFee,
        ISDRAFee,
        total,
        stripeFee: Math.ceil(total) * 0.029 + 30,
      },
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
