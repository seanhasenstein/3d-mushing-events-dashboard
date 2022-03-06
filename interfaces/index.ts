import { NextApiRequest } from 'next';
import { Db } from 'mongodb';

export interface Race {
  id: string;
  name: string;
  notes: string[];
  total?: number;
}

export interface Registration {
  _id: string;
  registrationId: string;
  firstName: string;
  lastName: string;
  birthday: string;
  guardian?: string;
  gender: 'male' | 'female';
  email: string;
  phone: string;
  city: string;
  state: string;
  races: Race[];
  summary: {
    trailFee: number;
    ISDRAFee?: number;
    subtotal: number;
    total: number;
    stripeFee: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  _id: string;
  name: string;
  dates: string;
  races: Race[];
  raceTotals: Race[];
  registrations: Registration[];
}

export type Gender = 'all' | 'female' | 'male';

export type SortBy =
  | 'createdAt'
  | 'lastName'
  | 'birthday'
  | 'gender'
  | 'events';

export type SortDirection = 'ascending' | 'descending';

export type TableProps = {
  children?: React.ReactNode;
  className?: string;
};

export interface ExtendRequest extends NextApiRequest {
  db: Db;
}
