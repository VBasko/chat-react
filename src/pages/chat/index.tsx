import { Outlet } from "react-router-dom";
import Header from "src/components/header";
import authMiddleware from "src/middleware/auth.middleware";

export const Name = "chat";

export const Loader = authMiddleware;

export const Page = () => {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>
    </>
  );
};
