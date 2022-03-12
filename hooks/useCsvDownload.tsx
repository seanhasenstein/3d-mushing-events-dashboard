import React from 'react';
import { Event } from '../interfaces';
import { fetchRegistrationCsv } from '../utils/registration';

export default function useCsvDownload(event: Event) {
  const [status, setStatus] = React.useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [error, setError] = React.useState(false);
  const csvLinkRef = React.useRef<HTMLAnchorElement>(null);

  const handleCsvClick = async () => {
    try {
      setStatus('loading');
      await fetchRegistrationCsv(csvLinkRef, event);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(true);
    }
  };

  return {
    csvStatus: status,
    csvLinkRef,
    handleCsvClick,
    csvError: error,
    setCsvError: setError,
  };
}
