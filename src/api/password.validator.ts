import { ValidationArguments } from "class-validator";

export function generatePasswordErrorMessage(
  args: ValidationArguments
): string {
  const { minLength, minLowercase, minUppercase, minNumbers, minSymbols } =
    args.constraints[0];

  const errorMessages: string[] = [];
  const password: string = args.value.toString();

  if (password.length < minLength) {
    errorMessages.push(`at least ${minLength} characters`);
  }
  if ((password.match(/[a-z]/g) || []).length < minLowercase) {
    errorMessages.push(`${minLowercase} lowercase letter`);
  }
  if ((password.match(/[A-Z]/g) || []).length < minUppercase) {
    errorMessages.push(`${minUppercase} uppercase letter`);
  }
  if ((password.match(/[0-9]/g) || []).length < minNumbers) {
    errorMessages.push(`${minNumbers} number`);
  }
  if ((password.match(/[\W_]/g) || []).length < minSymbols) {
    errorMessages.push(`${minSymbols} symbol`);
  }

  return `Your password should have ${errorMessages.join(", ")}.`;
}
