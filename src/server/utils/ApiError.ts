export class ApiError extends Error {
  public statusCode: number;
  public success: boolean;

  constructor(statusCode: number, message: string) {
    super(message); // Call the parent class constructor
    this.statusCode = statusCode;
    this.success = false;

    Object.setPrototypeOf(this, ApiError.prototype); // Fix prototype chain for custom error class
  }
}
