import { Link } from "react-router-dom";
import { resolveRoute, useNavigate } from "src/router/routes";
import { AuthService } from "src/api/services/auth.service";
import Button from "../button";
import { useTypedSelector } from "src/hooks/useTypedSelector";

const authService = new AuthService();

const links = [
  {
    name: "chat",
    label: "Chat",
  },
];

const Header = () => {
  const user = useTypedSelector((state) => state.user.value);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await authService.logOut();
    navigate({ name: "entry-point" });
  };

  return (
    <header className="flex items-center justify-between">
      <nav>
        <ul className="flex items-center gap-4">
          {links.map((item, index) => {
            return (
              <li key={`nav-link-${index}`}>
                <Link to={resolveRoute({ name: item.name })}>{item.name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex gap-4">
        {user ? (
          <>
            <span>User: {user.email}</span>

            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
