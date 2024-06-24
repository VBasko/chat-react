import { Link } from "react-router-dom";
import { ForgotModel } from "src/api/models/forgot.model";
import { AuthService } from "src/api/services/auth.service";
import Button from "src/components/button";
import { FormField } from "src/components/form-field";
import { useFormControl } from "src/hooks/useFormControl";
import { resolveRoute, useNavigate } from "src/router/routes";

export const Name = "forgot";

const authService = new AuthService();

export const Page = () => {
  const navigate = useNavigate();

  const { messages, handleSubmit, cleanErrors } = useFormControl(
    ForgotModel,
    (payload) => {
      authService
        .sendPasswordResetEmail(payload.email)
        .then(() => navigate({ name: "login" }));
    }
  );

  return (
    <div className="container py-8">
      <h1 className="text-2xl text-center mb-8">Forgot password</h1>

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
        </div>

        <Link to={resolveRoute({ name: "login" })}>
          Already have an account? Login
        </Link>

        <Button type="submit">Send email</Button>
      </form>
    </div>
  );
};
