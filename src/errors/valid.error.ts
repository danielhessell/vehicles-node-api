export class ValidError {
  public readonly errors: string[];
  public readonly status: string;
  public readonly statusCode: number;

  constructor(errors: string[], statusCode = 400) {
    this.errors = errors;
    this.statusCode = statusCode;

    switch (statusCode) {
      case 400:
        this.status = "Bad Request";
        break;
      case 401:
        this.status = "Unauthorized";
        break;
      case 403:
        this.status = "Forbidden";
        break;
      case 404:
        this.status = "Not Found";
        break;
      case 409:
        this.status = "Conflict";
        break;
      case 422:
        this.status = "Unprocessable Entity";
        break;
      case 500:
        this.status = "Internal Server Error";
        break;
      default:
        this.status = "Internal Server Error";
        this.statusCode = 500;
    }
  }
}
