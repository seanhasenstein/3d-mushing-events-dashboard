import React from 'react';
import { Event } from '../interfaces';

interface ContextState {
  event: Event;
  updateEvent: (update: Event) => void;
}

const RegistrationContext = React.createContext<ContextState>(
  {} as ContextState
);

export default function useRegistrationData() {
  const context = React.useContext(RegistrationContext);

  if (!context) {
    throw new Error('Component must be wrapped in a RegistrationProvider.');
  }

  return context;
}

type ProviderProps = {
  children: React.ReactNode;
  data: Event;
};

export function RegistrationProvider({ children, data }: ProviderProps) {
  const [event, setEvent] = React.useState(data);

  const updateEvent = (update: Event) => {
    setEvent(update);
  };

  return (
    <RegistrationContext.Provider
      value={{
        event,
        updateEvent,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
}
