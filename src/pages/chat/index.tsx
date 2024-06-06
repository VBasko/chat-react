import { redirect } from "src/router/routes";
import { AuthService } from "src/api/services/auth.service";

const authService = new AuthService();

export const Name = "chat";

export const Loader = async () => {
  const isLoggedIn = await authService.isLoggedIn();

  if (!isLoggedIn) {
    return redirect({ name: "login" });
  }

  return null;
};

export const Page = () => {
  return <div>Chat</div>;
};
