export class AuthTokenError extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    super(message ?? "Error with authentication token", options);
  }
}
