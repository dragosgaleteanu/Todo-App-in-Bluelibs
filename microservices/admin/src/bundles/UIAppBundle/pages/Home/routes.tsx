import { IRoute } from "@bluelibs/x-ui";
import { Home } from "./Home";
import { Todos } from "./Todos";

export const HOME: IRoute = {
  path: "/",
  component: Home,
};

export const TODOS: IRoute<{ token: string }> = {
  path: "/todos/:token",
  component: Todos,
};
