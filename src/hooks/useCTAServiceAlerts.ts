import { useState, useEffect, useRef } from 'react';
import { type CTAServiceAlert } from '../types/alerts';
import { MOCK_CTA_ALERTS } from '../data/mockAlerts';

export const useCTAServiceAlerts = () => {
  const [alerts, setAlerts] = useState<CTAServiceAlert[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<number | null>(null);

  const fetchAlerts = (isInitialLoad: boolean) => {
    setError(null);

    // Only set loading state to true on initial mount
    if (isInitialLoad) {
      setIsLoading(true);
    }

    setTimeout(() => {
      setAlerts(MOCK_CTA_ALERTS);
      setIsLoading(false);
    }, 800);
  };

  useEffect(() => {
    const startPolling = () => {
      if (intervalRef.current !== null) {
        return;
      }

      intervalRef.current = window.setInterval(() => fetchAlerts(false), 10000);
    };

    const stopPolling = () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchAlerts(false);
        startPolling();
        return;
      }

      stopPolling();
    };

    fetchAlerts(true);
    startPolling();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stopPolling();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return { alerts, isLoading, error };
};