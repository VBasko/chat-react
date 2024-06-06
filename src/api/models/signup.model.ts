import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";
import { IsEqualTo } from "src/api/is-equal-to.validator";

export class SignupModel {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @IsNotEmpty()
  @IsEqualTo("password")
  confirmPassword: string;
}
