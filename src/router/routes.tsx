import { useCallback } from "react";
import {
  useNavigate as _useNavigate,
  redirect as _redirect,
} from "react-router-dom";

interface RouteOptions {
  name: string;
  params?: Record<string, any>;
  query?: Record<string, any>;
}

export const resolveRoute = (route: RouteOptions) => {
  let path = routes[route.name];

  if (path === undefined) {
    throw new Error(`Route ${route.name} not found`);
  }

  if (route.params) {
    Object.entries(route.params).forEach(([key, value]) => {
      path = path.replace(`:${key}`, value);
    });
  }

  if (route.query) {
    path += "?";

    const queryString = Object.entries(route.query)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    path += queryString;
  }

  return path;
};

export const routes = {} as Record<string, string>;

export const useNavigate = () => {
  const _navigate = _useNavigate();

  const navigate = useCallback(
    (route: RouteOptions) => {
      return _navigate(resolveRoute(route));
    },
    [_navigate]
  );

  return navigate;
};

export const useRouteName = () => {
  const path = window.location.pathname;
  const paths = Object.entries(routes)
    .filter(([, refPath]) => {
      const segmentsA = refPath.split("/");
      const segmentsB = path.split("/");

      return segmentsA.length === segmentsB.length;
    })
    .find(([, refPath]) => {
      const segmentsA = refPath.split("/");
      const segmentsB = path.split("/");

      return segmentsA.every((segment, i) => {
        return segment === segmentsB[i] || segment.startsWith(":");
      });
    });

  return paths ? paths[0] : null;
};

export const redirect = (route: RouteOptions) => {
  console.log("redirect to: " + route.name);
  console.log(resolveRoute(route));
  console.log(_redirect(resolveRoute(route)));
  return _redirect(resolveRoute(route));
};
