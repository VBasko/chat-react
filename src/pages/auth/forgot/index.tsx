import { ForgotModel } from "src/api/models/forgot.model";
import { AuthService } from "src/api/services/auth.service";
import { FormField } from "src/components/form-field";
import { useFormControl } from "src/hooks/useFormControl";
import { useNavigate } from "src/router/routes";

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
      <h1>Forgot password</h1>

      <form onSubmit={handleSubmit} onInput={cleanErrors}>
        <div>
          <FormField
            type="email"
            placeholder="Email"
            name="email"
            error={!!messages.email}
            message={messages.email?.join(", ")}
          />
        </div>

        <button type="submit" className="submit-button">
          Send email
        </button>
      </form>
    </div>
  );
};
