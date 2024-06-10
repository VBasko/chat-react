import { AuthService } from "src/api/services/auth.service";
import { LoginModel } from "src/api/models/login.model";
import { useFormControl } from "src/hooks/useFormControl";
import { FormField } from "src/components/form-field";
import { resolveRoute, useNavigate } from "src/router/routes";
import { Link } from "react-router-dom";

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
    <div className="container py-8">
      <h1 className="text-2xl text-center mb-8">Login</h1>

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

          <Link to={resolveRoute({ name: "forgot" })}>Forgot password?</Link>
        </div>

        {messages.general && <p>{messages.general}</p>}

        <div>
          <span>Don't have an account?</span>

          <Link to={resolveRoute({ name: "signup" })}>Signup</Link>
        </div>

        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
    </div>
  );
};
