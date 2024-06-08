import { IsEmail } from "class-validator";

export class ForgotModel {
  @IsEmail()
  email: string;
}
