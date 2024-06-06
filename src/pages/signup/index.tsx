import { AuthService } from "src/api/services/auth.service";
import { useFormControl } from "src/hooks/useFormControl";
import { FormField } from "src/components/FormField";
import { SignupModel } from "src/api/models/signup.model";

const authService = new AuthService();

export const Name = "signup";

export const Page = () => {
  const { messages, handleSubmit, cleanErrors } = useFormControl(
    SignupModel,
    async (payload) => {
      await authService.signUp(payload.email, payload.password);
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

        <button type="submit" className="submit-button">
          Signup
        </button>
      </form>
    </div>
  );
};
