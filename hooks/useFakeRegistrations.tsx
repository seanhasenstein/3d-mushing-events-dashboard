import React from "react";
import { Registration } from "../interfaces";

export default function useFakeRegistrations() {
  const [registrations, setRegistrations] = React.useState<Registration[]>();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    async function fetchRegistrations() {
      const response = await fetch("/api/fake-registration");

      if (!response.ok) {
        setIsLoading(false);
        throw new Error("Failed to fetch the registration.");
      }

      const data: { registrations: Registration[] } = await response.json();
      setRegistrations(data.registrations);
      setIsLoading(false);
    }

    fetchRegistrations();
  }, []);

  return { registrations, isLoading };
}
