import { NextApiRequest } from 'next';
import { Db } from 'mongodb';

export interface Event {
  id: number;
  title: string;
  notes: string[];
}

export interface Race {
  id: string;
  name: string;
  dates: string;
  events: Event[];
}

export type Gender = 'male' | 'female';

export interface Registration {
  _id: string;
  registrationId: string;
  eventId: string;
  firstName: string;
  lastName: string;
  birthday: string;
  guardian?: string;
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

export type TableProps = {
  children?: React.ReactNode;
  className?: string;
};

export type SortBy = 'date' | 'name' | 'age' | 'gender' | 'events';
export type SortDirection = 'ascending' | 'descending';

export interface Request extends NextApiRequest {
  db: Db;
}
