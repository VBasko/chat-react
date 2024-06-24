import { AuthService } from "src/api/services/auth.service";
import { redirect, useRouteName as getRouteName } from "src/router/routes";

const authService = new AuthService();

const UNPROTECTED_ROUTES: string[] = ["login", "signup", "forgot"];

export default async function authMiddleware() {
  const isLoggedIn = await authService.isLoggedIn();
  const currentRoute = getRouteName();

  if (!isLoggedIn) {
    if (currentRoute && UNPROTECTED_ROUTES.includes(currentRoute)) {
      return null;
    }

    return redirect({ name: "login" });
  }

  return null;
}
