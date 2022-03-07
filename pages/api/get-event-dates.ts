import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  const fallDates = [
    new Date('10-16-2021').toISOString(),
    new Date('10-17-2021').toISOString(),
  ];
  const winterDates = [
    new Date('2-12-2022').toISOString(),
    new Date('2-13-2022').toISOString(),
  ];

  res.json({ fallDates, winterDates });
}
