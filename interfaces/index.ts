import { NextApiRequest } from 'next';
import { Db } from 'mongodb';

export interface Race {
  id: string;
  sled: string;
  category: string;
  breed: string;
  notes: string[];
  price: number;
  isdraFee: boolean;
  total?: number;
}

export interface Registration {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  guardian: string | null;
  gender: 'male' | 'female';
  email: string;
  phone: string;
  city: string;
  state: string;
  races: string[]; // race id's
  summary: {
    trailFee: number;
    isdraFee: number;
    subtotal: number;
    total: number;
    stripeFee: number;
  };
  stripeId: string;
  createdAt: string;
  updatedAt: string;
}

type RegistrationWithoutSummary = Omit<Registration, 'summary'>;

export interface UpdateRegistrationFormData extends RegistrationWithoutSummary {
  subtotal: string;
  trailFee: string;
  isdraFee: string;
}

export interface Sponsor {
  name: string;
  imgUrl: string;
  websiteUrl: string;
}

export interface Event {
  _id: string;
  name: string;
  dates: string[];
  races: Race[];
  registrations: Registration[];
  raceTotals: Race[]; // caclulated serverside
  logo: string;
  tag: 'fall' | 'winter';
  trailFee: number;
  isdraRaceFee: number;
  sponsors: Sponsor[];
  facebookUrl: string;
}

export type Gender = 'all' | 'female' | 'male';

export type SortBy = 'createdAt' | 'lastName' | 'age' | 'gender';

export type SortDirection = 'ascending' | 'descending';

export type TableProps = {
  children?: React.ReactNode;
  className?: string;
};

export interface ExtendRequest extends NextApiRequest {
  db: Db;
  query: { [key: string]: string };
}
