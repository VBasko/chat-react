import { RouteObject, createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import { NotFound } from "src/components/NotFound";

const routeCtx = require.context("../pages", true, /\.tsx$/);
const tree: RouteObject[] = [];

const normalizePath = (path: string) =>
  path
    .replace("./", "/")
    .replace(".tsx", "")
    .replace("index", "")
    .replace(/\/$/, "")
    .replace(/\/_/g, "/:");

routeCtx
  .keys()
  .sort((a, b) => {
    const aPath = normalizePath(a).split("/");
    const bPath = normalizePath(b).split("/");

    return aPath.length - bPath.length;
  })
  .forEach((p) => {
    const path = normalizePath(p);
    const moduleData = routeCtx(p);

    const { Loader, Page: PageElement, Name } = moduleData;

    if (Name) {
      routes[Name] = path || "/";
    }

    if (!PageElement) {
      throw new Error(`No "Page" export was found found in ${p}`);
    }

    const ElementToRender = <PageElement />;

    path.split("/").reduce((children, segment, i, arr) => {
      const isLast = i === arr.length - 1;

      if (segment === "" && !isLast) {
        return children;
      }

      const existing = children!.find((c) => c.path === segment);

      if (existing) {
        return existing.children;
      }

      const element = isLast ? ElementToRender : null;

      const newRoute = {
        path: segment,
        children: [],
      } as RouteObject;

      if (element) {
        newRoute.element = element;

        if (Loader) {
          newRoute.loader = Loader;
        }
      }

      children!.push(newRoute);
      children.sort((a, b) => {
        if (a.path!.startsWith(":") && !b.path!.startsWith(":")) {
          return 1;
        }

        if (!a.path!.startsWith(":") && b.path!.startsWith(":")) {
          return -1;
        }

        return 0;
      });

      return newRoute.children;
    }, tree);
  });

tree.push({
  path: "*",
  element: <NotFound />,
});

export const Router = createBrowserRouter(tree);
