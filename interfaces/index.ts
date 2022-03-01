import { NextApiRequest } from 'next';
import { Db } from 'mongodb';

export interface Event {
  id: number;
  title: string;
  notes: string[];
}

export type Gender = 'male' | 'female';

export interface Registration {
  _id: string;
  registrationId: string;
  eventId: string;
  firstName: string;
  lastName: string;
  birthday: string;
  guardian?: {
    firstName: string;
    lastName: string;
  };
  gender: Gender;
  email: string;
  phone: string;
  city: string;
  state: string;
  events: Event[];
  total: number;
  stripeFee: number;
  createdAt: string;
  updatedAt: string;
}

export interface Request extends NextApiRequest {
  db: Db;
}
