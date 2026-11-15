// Base Error Class
export class AppError extends Error {
    public readonly statusCode?: number;
    public readonly success: boolean = false;
    public readonly isLoggedIn?: boolean;
    public readonly error?: string;

    constructor(
        message: string,
        error?: string,
        isLoggedIn?: boolean,
        statusCode?: number,
    ) {
        super(message);
        this.statusCode = statusCode;
        this.isLoggedIn = isLoggedIn;
        this.error = error || "An internal server error occurred.";

        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}

// Specific Error Classes
export class NotFoundError extends AppError {
    constructor(
        message = "Resource not found",
        error?: string,
        isLoggedIn = true,
    ) {
        super(message, error, isLoggedIn, 404);
    }
}

export class UnprocessableEntityError extends AppError {
    constructor(
        message = "Unprocessable entity",
        error?: string,
        isLoggedIn = true,
    ) {
        super(message, error, isLoggedIn, 422);
    }
}

export class UnauthorizedError extends AppError {
    constructor(
        message = "Unauthorized access",
        error?: string,
        isLoggedIn = false,
    ) {
        super(message, error, isLoggedIn, 401);
    }
}

export class ConflictError extends AppError {
    constructor(
        message = "Conflict occurred",
        error?: string,
        isLoggedIn = false,
    ) {
        super(message, error, isLoggedIn, 409);
    }
}

export class BadRequestError extends AppError {
    constructor(
        message = "Bad request",
        error?: string,
        isLoggedIn = true,
    ) {
        super(message, error, isLoggedIn, 400);
    }
}

export class ForbiddenError extends AppError {
    constructor(
        message = "Access forbidden",
        error?: string,
        isLoggedIn = true,
    ) {
        super(message, error, isLoggedIn, 403);
    }
}
