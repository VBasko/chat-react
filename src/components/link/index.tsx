import { Link as ReactRouterLink } from "react-router-dom";
import { resolveRoute } from "src/router/routes";

interface LinkProps {
  children: React.ReactNode;
  routeName: string;
}

const Link = ({ children, routeName }: LinkProps) => {
  return (
    <ReactRouterLink
      to={resolveRoute({ name: routeName })}
      className="text-inherit hover:underline hover:decoration-inherit"
    >
      {children}
    </ReactRouterLink>
  );
};

export default Link;
