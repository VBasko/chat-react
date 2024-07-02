import store from "src/redux/store";
import { redirect, useRouteName as getRouteName } from "src/router/routes";

const UNPROTECTED_ROUTES: string[] = ["login", "signup", "forgot"];

// TODO: make it working
export default async function authMiddleware() {
  const state = store.getState();
  const isLoggedIn = state.user.isLoggedIn;

  const currentRoute = getRouteName();

  if (!isLoggedIn) {
    if (currentRoute && UNPROTECTED_ROUTES.includes(currentRoute)) {
      return null;
    }

    return redirect({ name: "login" });
  }

  return null;
}
