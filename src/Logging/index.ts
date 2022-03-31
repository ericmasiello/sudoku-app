import { useEffect } from 'react';
import LogRocket from 'logrocket';

export const useLogging = () => {
  useEffect(() => {
    LogRocket.init('eric-masiello/sudoku-app');
  }, []);
};
