import type { RouteObject } from "react-router";
import { nameRoutes } from "../configs/constants";
import { CreateUserPage } from "../pages/user/CreateUserPage";
import { UpdateUserPage } from "../pages/user/UpdateUserPage";
import { UserPage } from "../pages/user/UserPage";

export const UserRoutes: RouteObject[] = [
  {
    path: nameRoutes.user,
    element: <UserPage />,
  },
  {
    path: `${nameRoutes.user}/${nameRoutes.create}`,
    element: <CreateUserPage />,
  },
  {
    path: `${nameRoutes.user}/${nameRoutes.edit}/:id`,
    element: <UpdateUserPage />,
  },
];
