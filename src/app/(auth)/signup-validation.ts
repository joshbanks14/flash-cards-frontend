type ValidationResponse = {
    isValid: boolean;
    message: string;
  };

  export const passwordValidator = (password: string): ValidationResponse => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    if (password.length < minLength)
      return {
        isValid: false,
        message: `Password must be at least ${minLength} characters long.`,
      };
    if (!hasUpperCase)
      return {
        isValid: false,
        message: "Password must contain at least one uppercase letter.",
      };
    if (!hasLowerCase)
      return {
        isValid: false,
        message: "Password must contain at least one lowercase letter.",
      };
    if (!hasNumber)
      return {
        isValid: false,
        message: "Password must contain at least one number.",
      };
    if (!hasSpecialChar)
      return {
        isValid: false,
        message:
          "Password must contain at least one special character (!@#$%^&*).",
      };
    return { isValid: true, message: "" };
  };

  export const passwordsMatchChecker = (attemptOne: string, attemptTwo: string) =>
    attemptOne === attemptTwo;

  export const emailValidator = (email: string): ValidationResponse => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = re.test(String(email).toLowerCase());

    if (isEmailValid) return { isValid: true, message: "" };
    return { isValid: false, message: "Please enter a valid email address!" };
  };
