import { UnprocessableEntityError } from "@/utils/AppError.js";
import { NotFoundError } from "@/utils/AppError.js";

const ValidateFullName = (fullName: string) => {
    fullName = fullName?.trim();

    const fullNameReg = /^[^#$%^&*<>;:{}[\]`~]{4,30}$/;

    if (!fullName) throw new NotFoundError("Full name is required.");
    else if (fullName.length < 4 || fullName.length > 30) {
        throw new UnprocessableEntityError(
            "FullName must be between 4 to 30 characters.",
        );
    } else if (!fullNameReg.test(fullName)) {
        throw new UnprocessableEntityError(
            "Fullname cannot contain special characters like #, $, %, or brackets, etc",
        );
    }
};

const ValidateEmail = (email: string) => {
    email = email?.trim();

    const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email) throw new NotFoundError("Email is required");
    else if (!emailReg.test(email)) {
        throw new UnprocessableEntityError("Provide a valid email");
    }
};

const ValidateUserName = (userName: string) => {
    userName = userName?.trim();

    const userNameReg = /^(?!.*[_\-\.]{2})[a-z0-9_\-\.]{4,20}$/; //eslint-disable-line

    if (!userName) throw new NotFoundError("Username is required");
    if (userName.length < 4 || userName.length > 20) {
        throw new UnprocessableEntityError(
            "Username must be between 4 to 20 characters.",
        );
    } else if (!userNameReg.test(userName)) {
        throw new UnprocessableEntityError(
            "Username can only contain lowercase letters, numbers, underscores, hyphens, periods and cannot contain consecutive symbols (like __, --, or ..).",
        );
    }
};

const ValidatePassword = (password: string) => {
    password = password?.trim();

    const passwordReg =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;

    if (!password) throw new NotFoundError("Password is required");
    if (password.length < 8 || password.length > 32) {
        throw new UnprocessableEntityError(
            "Password must be between 8 to 32 characters.",
        );
    } else if (!passwordReg.test(password)) {
        throw new UnprocessableEntityError(
            "Password must include a lowercase letter, an uppercase letter, a number and a special character",
        );
    }
};

const AuthUtils = {
    ValidateFullName,
    ValidateEmail,
    ValidateUserName,
    ValidatePassword,
};

export default AuthUtils;
