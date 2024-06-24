import { IsEmail } from "class-validator";

export class ForgotModel {
  @IsEmail({}, { message: "Please enter valid email address." })
  email: string;
}
