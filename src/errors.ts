export class TypestError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.status = status;
  }
}

export class BadRequestError extends TypestError {
  constructor(message = 'Bad Request') {
    super(message, 400);
  }
}

export class UnauthorizedError extends TypestError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

export class NotFoundError extends TypestError {
  constructor(message = 'Not Found') {
    super(message, 404);
  }
}

export class InternalServerError extends TypestError {
  constructor(message = 'Internal Server Error') {
    super(message, 500);
  }
}