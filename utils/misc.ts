import crypto from 'crypto';
import { differenceInYears } from 'date-fns';
import { format } from 'date-fns-tz';
import { Gender } from '../interfaces';

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const NUM = '0123456789';

export function createReceiptNumber() {
  const rnd = crypto.randomBytes(11);
  const value = new Array(11);
  const charsLength = NUM.length;

  for (let i = 0; i < value.length; i++) {
    if (i === 5) {
      value[5] = '-';
    } else {
      value[i] = NUM[rnd[i] % charsLength];
    }
  }

  return value.join('');
}

export function formatAge(dateString: string) {
  const birthday = new Date(dateString);
  const age = differenceInYears(new Date(), birthday);
  return age;
}

export function formatDate(
  dateString: string,
  stringFormat = 'MMM. dd, yyyy h:mmaa'
) {
  return format(new Date(dateString), stringFormat);
}

export function formatGender(gender: Gender) {
  return gender === 'female' ? 'F' : 'M';
}

export function formatToMoney(input: number, includeDecimal = false) {
  const price = input / 100;

  if (includeDecimal) {
    return `$${price.toFixed(2)}`;
  } else {
    return `$${price}`;
  }
}

export function removeNonDigits(input: string) {
  return input.replace(/\D/g, '');
}

export function formatPhoneNumber(input: string) {
  const digits = removeNonDigits(input);
  const digitsArray = digits.split('');
  return digitsArray
    .map((v, i) => {
      if (i === 10) return;
      if (i === 0) return `(${v}`;
      if (i === 2) return `${v}) `;
      if (i === 5) return `${v}-`;
      return v;
    })
    .join('');
}

export function requiresGuardian(birthday: Date) {
  return formatAge(`${birthday}`) < 18;
}

export const stateList = [
  { value: 'AK', text: 'Alaska' },
  { value: 'AL', text: 'Alabama' },
  { value: 'AR', text: 'Arkansas' },
  { value: 'AS', text: 'American Samoa' },
  { value: 'AZ', text: 'Arizona' },
  { value: 'CA', text: 'California' },
  { value: 'CO', text: 'Colorado' },
  { value: 'CT', text: 'Connecticut' },
  { value: 'DC', text: 'District of Columbia' },
  { value: 'DE', text: 'Delaware' },
  { value: 'FL', text: 'Florida' },
  { value: 'GA', text: 'Georgia' },
  { value: 'GU', text: 'Guam' },
  { value: 'HI', text: 'Hawaii' },
  { value: 'IA', text: 'Iowa' },
  { value: 'ID', text: 'Idaho' },
  { value: 'IL', text: 'Illinois' },
  { value: 'IN', text: 'Indiana' },
  { value: 'KS', text: 'Kansas' },
  { value: 'KY', text: 'Kentucky' },
  { value: 'LA', text: 'Louisiana' },
  { value: 'MA', text: 'Massachusetts' },
  { value: 'MD', text: 'Maryland' },
  { value: 'ME', text: 'Maine' },
  { value: 'MI', text: 'Michigan' },
  { value: 'MN', text: 'Minnesota' },
  { value: 'MO', text: 'Missouri' },
  { value: 'MS', text: 'Mississippi' },
  { value: 'MT', text: 'Montana' },
  { value: 'NC', text: 'North Carolina' },
  { value: 'ND', text: 'North Dakota' },
  { value: 'NE', text: 'Nebraska' },
  { value: 'NH', text: 'New Hampshire' },
  { value: 'NJ', text: 'New Jersey' },
  { value: 'NM', text: 'New Mexico' },
  { value: 'NV', text: 'Nevada' },
  { value: 'NY', text: 'New York' },
  { value: 'OH', text: 'Ohio' },
  { value: 'OK', text: 'Oklahoma' },
  { value: 'OR', text: 'Oregon' },
  { value: 'PA', text: 'Pennsylvania' },
  { value: 'PR', text: 'Puerto Rico' },
  { value: 'RI', text: 'Rhode Island' },
  { value: 'SC', text: 'South Carolina' },
  { value: 'SD', text: 'South Dakota' },
  { value: 'TN', text: 'Tennessee' },
  { value: 'TX', text: 'Texas' },
  { value: 'UT', text: 'Utah' },
  { value: 'VA', text: 'Virginia' },
  { value: 'VI', text: 'Virgin Islands' },
  { value: 'VT', text: 'Vermont' },
  { value: 'WA', text: 'Washington' },
  { value: 'WI', text: 'Wisconsin' },
  { value: 'WV', text: 'West Virginia' },
  { value: 'WY', text: 'Wyoming' },
];
