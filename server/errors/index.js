class NotFound extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFound";
    this.statusCode = 404;
  }
}

class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequest";
    this.statusCode = 400;
  }
}

class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.name = "Unauthorized";
    this.statusCode = 401;
  }
}

class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.name = "Forbidden";
    this.statusCode = 403;
  }
}

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.name = "InternalServerError";
    this.statusCode = 500;
  }
}

export {
  NotFound,
  BadRequest,
  Unauthorized,
  Forbidden,
  InternalServerError
}