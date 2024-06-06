import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginModel {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
