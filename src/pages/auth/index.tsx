import { Outlet } from "react-router-dom";
import authMiddleware from "src/middleware/auth.middleware";

export const Loader = authMiddleware;

export const Page = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};
