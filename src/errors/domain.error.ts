export class DomainError extends Error {
  public readonly message: string;
  public readonly status: string;
  public readonly statusCode: number;

  constructor(message: string) {
    super(message);
    this.message = message;
    this.status = "Unprocessable Entity";
    this.statusCode = 422;
  }
}
