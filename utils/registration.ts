import { format } from 'date-fns';
import { Event, Registration, UpdateRegistrationFormData } from '../interfaces';
import {
  calculateStripeFee,
  formatPhoneNumber,
  removeNonDigits,
  requiresGuardian,
  slugify,
} from './misc';

export async function updateRegistrationMutation(
  eventId: string,
  regitrationId: string,
  formData: UpdateRegistrationFormData
) {
  const response = await fetch('/api/update-registration', {
    method: 'POST',
    body: JSON.stringify({
      eventId,
      regitrationId,
      formData,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to update the registration');
  }

  const data = await response.json();
  return data;
}

export function formatRegistrationForDb(
  formData: UpdateRegistrationFormData,
  eventDate: string
): Registration {
  const subtotal = Number(formData.subtotal) * 100;
  const trailFee = Number(formData.trailFee) * 100;
  const isdraFee = Number(formData.isdraFee) * 100;
  const total = subtotal + trailFee + isdraFee;

  const formatGuardian = () => {
    if (formData.guardian === null) {
      return null;
    } else {
      const isRequired = requiresGuardian(formData.birthday, eventDate);
      return isRequired ? formData.guardian.trim() : null;
    }
  };

  return {
    id: formData.id,
    firstName: formData.firstName.trim(),
    lastName: formData.lastName.trim(),
    email: formData.email.trim().toLowerCase(),
    phone: removeNonDigits(formData.phone),
    city: formData.city.trim(),
    state: formData.state,
    gender: formData.gender,
    birthday: new Date(formData.birthday).toISOString(),
    guardian: formatGuardian(),
    races: formData.races,
    summary: {
      subtotal,
      trailFee,
      isdraFee,
      total,
      stripeFee: calculateStripeFee(total),
    },
    createdAt: formData.createdAt,
    updatedAt: new Date().toISOString(),
  };
}

export function formatRegistrationForForm(dbRegistration: Registration) {
  const { summary, ...rest } = dbRegistration;
  const phone = formatPhoneNumber(dbRegistration.phone);
  const birthday = format(new Date(dbRegistration.birthday), 'yyyy-MM-dd');
  const guardian = dbRegistration.guardian || '';
  const subtotal = (Math.round(dbRegistration.summary.subtotal) / 100).toFixed(
    2
  );
  const trailFee = (Math.round(dbRegistration.summary.trailFee) / 100).toFixed(
    2
  );
  const isdraFee = (
    Math.round(dbRegistration.summary.isdraFee || 0) / 100
  ).toFixed(2);
  return {
    ...rest,
    phone,
    birthday,
    guardian,
    subtotal,
    trailFee,
    isdraFee,
  };
}

export async function fetchRegistrationCsv(
  ref: React.RefObject<HTMLAnchorElement>,
  event: Event
) {
  const response = await fetch(
    `/api/registrations-to-csv?eventId=${event._id}`
  );

  if (!response.ok) {
    throw new Error('Failed to download the csv data');
  }

  const data = await response.json();
  ref.current?.setAttribute('href', `data:text/csv;charset=utf-8,${data.csv}`);
  ref.current?.setAttribute(
    'download',
    `${slugify(event.name)}-registrations-${format(
      new Date(),
      'MMddyyHHmmss'
    )}.csv`
  );
  ref.current?.click();
}
