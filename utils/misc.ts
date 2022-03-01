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
