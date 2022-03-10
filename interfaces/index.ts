import { NextApiRequest } from 'next';
import { Db } from 'mongodb';

export interface Race {
  id: string;
  name: string;
  notes: string[];
  total?: number;
}

export interface Registration {
  id: string;
  firstName: string;
  lastName: string;
  birthday: string;
  guardian: string | null;
  gender: 'male' | 'female';
  email: string;
  phone: string;
  city: string;
  state: string;
  races: Race[];
  summary: {
    trailFee: number;
    isdraFee: number;
    subtotal: number;
    total: number;
    stripeFee: number;
  };
  createdAt: string;
  updatedAt: string;
}

type RegistrationWithoutSummary = Omit<Registration, 'summary'>;

export interface UpdateRegistrationFormData extends RegistrationWithoutSummary {
  subtotal: string;
  trailFee: string;
  isdraFee: string;
}

export interface Event {
  _id: string;
  name: string;
  dates: string[];
  races: Race[];
  raceTotals: Race[];
  registrations: Registration[];
  logo: string;
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
  query: { [key: string]: string };
}
