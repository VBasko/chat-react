import { AuthService } from "src/api/services/auth.service";
import { LoginModel } from "src/api/models/login.model";
import { useFormControl } from "src/hooks/useFormControl";
import { FormField } from "src/components/FormField";
import { useNavigate } from "src/router/routes";

const authService = new AuthService();

export const Name = "login";

export const Page = () => {
  const { messages, handleSubmit, cleanErrors } = useFormControl(
    LoginModel,
    async (payload) => {
      await authService.logIn(payload.email, payload.password);
    }
  );

  const navigate = useNavigate();

  const handleForgotPassword = () => {
    navigate({ name: "forgot" });
  };

  return (
    <div>
      <h1>Login</h1>

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

          <button type="button" onClick={handleForgotPassword}>
            Forgot password?
          </button>
        </div>

        {messages.general && <p>{messages.general}</p>}

        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
    </div>
  );
};
