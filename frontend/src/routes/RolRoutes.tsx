import type { RouteObject } from "react-router";
import { nameRoutes } from "../configs/constants";
import { CreateRolPage } from "../pages/rol/CreateRolPage";
import { RolPage } from "../pages/rol/RolPage";
import { UpdateRolPage } from "../pages/rol/UpdateRolPage";

export const RolRoutes: RouteObject[] = [
  {
    path: nameRoutes.rol,
    element: <RolPage />,
  },
  {
    path: `${nameRoutes.rol}/${nameRoutes.create}`,
    element: <CreateRolPage />,
  },
  {
    path: `${nameRoutes.rol}/${nameRoutes.edit}/:id`,
    element: <UpdateRolPage />,
  },
];
