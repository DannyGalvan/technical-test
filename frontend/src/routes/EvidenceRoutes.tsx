import type { RouteObject } from "react-router";

import { nameRoutes } from "../configs/constants";
import { AuthorizationsPendingPage } from "../pages/evidence/AuthorizationsPendingPage";
import { EvidenceCreatePage } from "../pages/evidence/EvidenceCreatePage";
import { EvidenceListPage } from "../pages/evidence/EvidenceListPage";
import Protected from "./middlewares/Protected";

export const EvidenceRoutes: RouteObject[] = [
  {
    path: nameRoutes.evidence,
    element: (
      <Protected>
        <EvidenceListPage />
      </Protected>
    ),
  },
  {
    path: `${nameRoutes.evidence}/${nameRoutes.authorize}`,
    element: (
      <Protected>
        <AuthorizationsPendingPage />
      </Protected>
    ),
  },
  {
    path: `${nameRoutes.evidence}/${nameRoutes.create}`,
    element: (
      <Protected>
        <EvidenceCreatePage />
      </Protected>
    ),
  },
];
