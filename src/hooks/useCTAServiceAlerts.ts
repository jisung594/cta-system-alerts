import { useState, useEffect } from 'react';
import { type CTAServiceAlert } from '../types/alerts';
import { MOCK_CTA_ALERTS } from '../data/mockAlerts';

export const useCTAServiceAlerts = () => {
  const [alerts, setAlerts] = useState<CTAServiceAlert[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlerts = () => {
      setError(null);
      setIsLoading(true);

      setTimeout(() => {
        setAlerts(MOCK_CTA_ALERTS);
        setIsLoading(false);
      }, 800);
    };

    fetchAlerts();
    const intervalId = window.setInterval(fetchAlerts, 10000);

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return { alerts, isLoading, error };
};