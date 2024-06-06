import { AuthService } from "src/api/services/auth.service";

const authService = new AuthService();

export async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const form = e.currentTarget as HTMLFormElement;
  if (form) {
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    console.log({ email, password, confirmPassword });

    if (password === confirmPassword) {
      await authService.signUp(email, password);
    }
  } else {
    console.error("Form element not found");
  }
}

export const SignUp = () => {
  return (
    <div>
      <h1>Sign Up</h1>

      <form onSubmit={handleSignup}>
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          required
        />
        <button>Signup</button>
      </form>
    </div>
  );
};
