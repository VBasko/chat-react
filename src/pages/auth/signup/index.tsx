import { AuthService } from "src/api/services/auth.service";
import { useFormControl } from "src/hooks/useFormControl";
import { FormField } from "src/components/FormField";
import { SignupModel } from "src/api/models/signup.model";
import { Link } from "react-router-dom";
import { resolveRoute, useNavigate } from "src/router/routes";

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
      <h1>Signup</h1>

      <form onSubmit={handleSubmit} onInput={cleanErrors}>
        <div>
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

        <div>
          <span>Already have an account?</span>

          <Link to={resolveRoute({ name: "login" })}>Login</Link>
        </div>

        <button type="submit" className="submit-button">
          Signup
        </button>
      </form>
    </div>
  );
};
