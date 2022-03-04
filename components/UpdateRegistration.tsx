import React from 'react';
import { format } from 'date-fns';
import { Event, Registration } from '../interfaces';
import { formatPhoneNumber, requiresGuardian, stateList } from '../utils/misc';

type Props = {
  events: Event[];
  isOpen: boolean;
  registration: Registration;
};

export default function UpdateRegistration({
  events,
  isOpen,
  registration,
}: Props) {
  const [values, setValues] = React.useState(() => {
    const phone = formatPhoneNumber(registration.phone);
    const birthday = format(new Date(registration.birthday), 'yyyy-MM-dd');
    const guardian = registration.guardian || '';
    const total = Math.round(registration.total) / 100;
    return { ...registration, phone, birthday, guardian, total };
  });

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'inherit';
    };
  }, [isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const updatedValues = { ...values, [e.target.name]: e.target.value };
    setValues(updatedValues);
  };

  const handleEventChange = (newId: string, index: number) => {
    const newEvent = events.find(e => e.id === Number(newId));
    if (!newEvent) return;
    const eventsCopy = [...values.events];
    eventsCopy.splice(index, 1, newEvent);
    setValues({ ...values, events: eventsCopy });
  };

  const handleRemoveEventClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.stopPropagation();
    const events = [...values.events];
    events.splice(index, 1);
    setValues({ ...values, events });
  };

  return (
    <form>
      <div className="mt-2.5 flex gap-x-4">
        <div className="w-full">
          <label
            htmlFor="firstName"
            className="block text-xs font-medium text-gray-700"
          >
            First name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={values.firstName}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-1 focus:ring-sky-700 focus:border-sky-700 sm:text-sm"
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="lastName"
            className="block text-xs font-medium text-gray-700"
          >
            Last name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={values.lastName}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-1 focus:ring-sky-700 focus:border-sky-700 sm:text-sm"
          />
        </div>
      </div>
      <div className="mt-4">
        <label
          htmlFor="email"
          className="block text-xs font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={values.email}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-1 focus:ring-sky-700 focus:border-sky-700 sm:text-sm"
        />
      </div>
      <div className="mt-4">
        <label
          htmlFor="phone"
          className="block text-xs font-medium text-gray-700"
        >
          Phone
        </label>
        <input
          type="text"
          name="phone"
          id="phone"
          value={values.phone}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-1 focus:ring-sky-700 focus:border-sky-700 sm:text-sm"
        />
      </div>
      <div className="mt-4 flex gap-x-4">
        <div className="w-full">
          <label
            htmlFor="city"
            className="block text-xs font-medium text-gray-700"
          >
            City
          </label>
          <input
            type="text"
            name="city"
            id="city"
            value={values.city}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-1 focus:ring-sky-700 focus:border-sky-700 sm:text-sm"
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="state"
            className="block text-xs font-medium text-gray-700"
          >
            State
          </label>
          <select
            name="state"
            id="state"
            value={values.state}
            onChange={handleInputChange}
            className="mt-1 py-1.5 px-3 w-full shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-700 focus:border-sky-700 sm:text-sm border border-gray-300 rounded-md"
          >
            {stateList.map(s => (
              <option key={s.value} value={s.value}>
                {s.text}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-4 flex gap-x-4">
        <div className="w-full">
          <label
            htmlFor="gender"
            className="block text-xs font-medium text-gray-700"
          >
            Gender
          </label>
          <select
            name="gender"
            id="gender"
            value={values.gender}
            onChange={handleInputChange}
            className="mt-1 py-1.5 px-3 w-full shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-700 focus:border-sky-700 sm:text-sm border border-gray-300 rounded-md"
          >
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>
        <div className="w-full">
          <label
            htmlFor="birthday"
            className="block text-xs font-medium text-gray-700"
          >
            Birthday
          </label>
          <input
            type="date"
            name="birthday"
            id="birthday"
            value={values.birthday}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-1 focus:ring-sky-700 focus:border-sky-700 sm:text-sm"
          />
        </div>
      </div>
      {requiresGuardian(new Date(values.birthday)) && (
        <div className="mt-4">
          <label
            htmlFor="guardian"
            className="block text-xs font-medium text-gray-700"
          >
            Guardian
          </label>
          <input
            type="text"
            name="guardian"
            id="guardian"
            value={values.guardian}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-1 focus:ring-sky-700 focus:border-sky-700 sm:text-sm"
          />
        </div>
      )}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="font-medium tracking-tight">Events</h3>
        {values.events.map((e, i) => (
          <div key={e.id} className="mt-1.5 flex items-center gap-x-1">
            <select
              name={`event-${i}`}
              id={`event-${i}`}
              value={e.id}
              onChange={event => handleEventChange(event.target.value, i)}
              title={e.title}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1.5 pl-3 pr-8 truncate focus:outline-none focus:ring-1 focus:ring-sky-700 focus:border-sky-700 sm:text-sm"
            >
              <option value="9999">Select an event</option>
              {events.map(we => (
                <option key={we.id} value={we.id}>
                  {we.title}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={e => handleRemoveEventClick(e, i)}
              className="py-2 px-1.5 flex justify-center items-center border border-transparent rounded-md text-gray-900 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Remove event</span>
            </button>
          </div>
        ))}
        <div className="flex justify-end pr-9">
          <button
            type="button"
            onClick={() =>
              setValues({
                ...values,
                events: [
                  ...values.events,
                  { id: 9999, title: 'Select an event', notes: [] },
                ],
              })
            }
            className="mt-3 w-full flex justify-center items-center pl-3 pr-4 py-2 shadow-sm text-xs font-medium rounded-md text-gray-200 bg-gray-800 hover:bg-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1 flex-shrink-0 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add {values.events.length > 0 ? 'another' : 'an'} event
          </button>
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="mb-1.5 font-medium tracking-tight">Payment details</h3>
        <div className="flex">
          <div className="mt-1.5 w-full">
            <label
              htmlFor="total"
              className="block text-xs font-medium text-gray-700"
            >
              Total
            </label>
            <div className="relative">
              <span className="absolute top-0 bottom-0 flex items-center pl-3 py-1 text-sm text-gray-500 pointer-events-none">
                $
              </span>
              <input
                type="number"
                name="total"
                id="total"
                placeholder="0.00"
                value={values.total}
                onChange={handleInputChange}
                className="mt-1 pl-7 block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-1 focus:ring-sky-700 focus:border-sky-700 sm:text-sm placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
