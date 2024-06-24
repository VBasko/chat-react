import { AuthService } from "src/api/services/auth.service";
import { useFormControl } from "src/hooks/useFormControl";
import { FormField } from "src/components/form-field";
import { SignupModel } from "src/api/models/signup.model";
import { Link } from "react-router-dom";
import { resolveRoute, useNavigate } from "src/router/routes";
import Button from "src/components/button";

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
    <div className="container py-8">
      <h1 className="text-2xl text-center mb-8">Signup</h1>

      <form
        onSubmit={handleSubmit}
        onInput={cleanErrors}
        className="mx-auto max-w-sm"
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

        <Link to={resolveRoute({ name: "login" })}>
          Already have an account? Login
        </Link>

        <Button type="submit">Signup</Button>
      </form>
    </div>
  );
};
