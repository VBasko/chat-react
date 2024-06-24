import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginModel {
  @IsEmail({}, { message: "Please enter valid email address." })
  email: string;

  @IsNotEmpty({ message: "Password should not be empty." })
  password: string;
}
