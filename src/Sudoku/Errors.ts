export class ValidationError extends Error {
  key: string;

  constructor(message: string, key: string) {
    super(message);
    this.key = key;
    this.name = 'ValidationError';
  }
}
