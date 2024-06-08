import { AuthService } from "src/api/services/auth.service";
import { redirect, useRouteName as getRouteName } from "src/router/routes";

const authService = new AuthService();

export default async function authMiddleware() {
  const isLoggedIn = await authService.isLoggedIn();
  const currentRoute = getRouteName();

  if (!isLoggedIn) {
    if (currentRoute !== "login") {
      return redirect({ name: "login" });
    }

    return null;
  }

  return null;
}
