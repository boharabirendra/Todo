export class BaseError extends Error {
  constructor(message = "") {
    super(message);
    this.message = message;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class UnauthenticatedError extends BaseError {
  constructor(message = "Unauthenticated") {
    super(message);
  }
}

export class ForbiddenError extends BaseError {
  constructor(message = "Forbidden access") {
    super(message);
  }
}

export class NotFoundError extends BaseError {
  constructor(message = "Not Found") {
    super(message);
  }
}


export class ConflictError extends BaseError {
    constructor(message = "Conflict") {
      super(message);
    }
}

export class BadRequestError extends BaseError {
    constructor(message = "BadRequest") {
      super(message);
    }
}