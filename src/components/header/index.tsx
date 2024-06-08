import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { resolveRoute, useNavigate } from "src/router/routes";
import { AuthService } from "src/api/services/auth.service";

const authService = new AuthService();

const links = [
  {
    name: "chat",
    label: "Chat",
  },
];

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authService.logOut();
    navigate({ name: "entry-point" });
  };

  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.navList}>
          {links.map((item, index) => {
            return (
              <li key={`nav-link-${index}`}>
                <Link to={resolveRoute({ name: item.name })}>{item.name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <button onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Header;
