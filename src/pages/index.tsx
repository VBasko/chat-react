import authMiddleware from "src/middleware/auth.middleware";
import { redirect } from "src/router/routes";

export const Name = "entry-point";

export const Loader = async () => {
  const middlewareResult = await authMiddleware();

  if (!middlewareResult) {
    return redirect({ name: "chat" });
  }

  return middlewareResult;
};

export const Page = () => null;
