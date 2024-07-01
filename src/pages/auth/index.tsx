import { Outlet } from "react-router-dom";
import authMiddleware from "src/middleware/auth.middleware";

export const Loader = authMiddleware;

export const Page = () => {
  return (
    <main>
      <div className="container py-8">
        <Outlet />
      </div>
    </main>
  );
};
