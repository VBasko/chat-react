import { useNavigate } from "src/router/routes";
import { AuthService } from "src/api/services/auth.service";
import { SignupModel } from "src/api/models/signup.model";
import { useFormControl } from "src/hooks/useFormControl";
import Button from "src/components/button";
import FormField from "src/components/form-field";
import Link from "src/components/link";

const authService = new AuthService();

export const Name = "signup";

export const Page = () => {
  const navigate = useNavigate();

  const { messages, handleSubmit, cleanErrors } = useFormControl(
    SignupModel,
    (payload) => {
      authService
        .signUp(payload.email, payload.password)
        .then(() => navigate({ name: "chat" }));
    }
  );

  return (
    <div>
      <h1 className="text-2xl text-center mb-8">Signup</h1>

      <form
        onSubmit={handleSubmit}
        onInput={cleanErrors}
        className="mx-auto max-w-sm flex flex-col gap-y-6"
      >
        <div className="flex flex-col gap-y-4">
          <FormField
            type="email"
            placeholder="Email"
            name="email"
            error={!!messages.email}
            message={messages.email?.join(", ")}
          />

          <FormField
            type="password"
            placeholder="Password"
            name="password"
            error={!!messages.password}
            message={messages.password?.join(", ")}
          />

          <FormField
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            error={!!messages.confirmPassword}
            message={messages.confirmPassword?.join(", ")}
          />
        </div>

        {messages.general && <p>{messages.general}</p>}

        <Link routeName="login">Already have an account? Login</Link>

        <Button type="submit" className="self-start">
          Signup
        </Button>
      </form>
    </div>
  );
};
