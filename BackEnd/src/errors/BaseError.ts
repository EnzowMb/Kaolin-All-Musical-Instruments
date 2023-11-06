export class BaseError extends Error {
  message: string;
  status: number;

  constructor(message: string = 'Internal Server Error', status: number = 500) {
    super();
    this.message = message;
    this.status = status;
  }

  sendResponse(res: any): void {
    res.status(this.status).send({
      message: this.message,
      status: this.status,
    });
  }
}
