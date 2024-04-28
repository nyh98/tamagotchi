export class MyError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export class NotFoundError extends MyError {}

export class ValidatorError extends MyError {}

export class AuthError extends MyError {}

export class UncaughtError extends MyError {
  err: unknown;
  constructor(err: unknown) {
    super('에러 발생 관리자에게 문의주세요', 500);
    this.err = err;
  }
}
