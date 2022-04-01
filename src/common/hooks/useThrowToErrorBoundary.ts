import { useCallback, useState } from 'react';

// Hook to make error boundaries work for async calls.
//
// See:
// - https://medium.com/trabe/catching-asynchronous-errors-in-react-using-error-boundaries-5e8a5fd7b971
// - https://github.com/facebook/react/issues/14981

export const useThrowToErrorBoundary = () => {
  const [, setError] = useState();
  return useCallback(
    (e: any) => {
      setError(() => {
        throw e;
      });
    },
    [setError]
  );
};
