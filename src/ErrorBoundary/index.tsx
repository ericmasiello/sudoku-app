import type { FallbackProps } from 'react-error-boundary';
import { Alert } from '../common/Components/Alert';
import { Button } from '../common/Components/Button';
import './ErrorBoundary.css';

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <Alert className="error-boundary">
      <p>Oh no 😔. Something went wrong:</p>
      <pre>{error.message}</pre>
      <Button onClick={resetErrorBoundary}>Try again 🤷‍♀️</Button>
    </Alert>
  );
};
