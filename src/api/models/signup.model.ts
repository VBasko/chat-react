import { IsEmail, IsStrongPassword } from "class-validator";
import { IsEqualTo } from "src/api/is-equal-to.validator";
import { generatePasswordErrorMessage } from "src/api/password.validator";

export class SignupModel {
  @IsEmail({}, { message: "Please enter valid email address." })
  email: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message: generatePasswordErrorMessage,
    }
  )
  password: string;

  @IsEqualTo("password", { message: "Passwords do not match." })
  confirmPassword: string;
}
