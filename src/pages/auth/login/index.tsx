import { useNavigate } from "src/router/routes";
import { AuthService } from "src/api/services/auth.service";
import { LoginModel } from "src/api/models/login.model";
import { useFormControl } from "src/hooks/useFormControl";

import Button from "src/components/button";
import FormField from "src/components/form-field";
import Link from "src/components/link";

const authService = new AuthService();

export const Name = "login";

export const Page = () => {
  const navigate = useNavigate();

  const { messages, handleSubmit, cleanErrors } = useFormControl(
    LoginModel,
    (payload) => {
      authService
        .logIn(payload.email, payload.password)
        .then(() => navigate({ name: "chat" }));
    }
  );

  return (
    <div>
      <h1 className="text-2xl text-center mb-8">Login</h1>

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
        </div>

        {messages.general && <p>{messages.general}</p>}

        <div className="flex gap-2 justify-between flex-wrap">
          <Link routeName="forgot">Forgot password?</Link>
          <Link routeName="signup">Don't have an account? Signup</Link>
        </div>

        <Button type="submit" className="self-start">
          Login
        </Button>
      </form>
    </div>
  );
};
