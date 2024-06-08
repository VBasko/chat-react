import { Outlet } from "react-router-dom";
import authMiddleware from "src/middleware/auth.middleware";

export const Loader = authMiddleware;

export const Page = () => {
  return (
    <div>
      <span>auth layout</span>

      <Outlet />
    </div>
  );
};
