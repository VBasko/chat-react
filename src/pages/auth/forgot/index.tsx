import { useNavigate } from "src/router/routes";
import { ForgotModel } from "src/api/models/forgot.model";
import { AuthService } from "src/api/services/auth.service";
import { useFormControl } from "src/hooks/useFormControl";

import Button from "src/components/button";
import FormField from "src/components/form-field";
import Link from "src/components/link";

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
    <div>
      <h1 className="text-2xl text-center mb-8">Forgot password</h1>

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
        </div>

        <Link routeName="login">Already have an account? Login</Link>

        <Button type="submit" className="self-start">
          Send email
        </Button>
      </form>
    </div>
  );
};
