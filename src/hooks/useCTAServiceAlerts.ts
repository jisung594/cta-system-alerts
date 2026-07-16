import { useState, useEffect } from 'react';
import { type CTAServiceAlert } from '../types/alerts';
import { MOCK_CTA_ALERTS } from '../data/mockAlerts';

export const useCTAServiceAlerts = () => {
  const [alerts, setAlerts] = useState<CTAServiceAlert[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);``

  useEffect(() => {
    // Simulate a brief network delay (800ms)
    const timer = setTimeout(() => {
      setAlerts(MOCK_CTA_ALERTS);
      setIsLoading(false);
      setError(null);
    }, 800);

    // Clean up timer when component unmounts
    return () => clearTimeout(timer);
  }, []); 

  return { alerts, isLoading, error };
};