import type { InitialAuth } from "../types/InitialAuth";
import type { RolRequest } from "../types/RolRequest";
import type { UserRequest } from "../types/UserRequest";

export const URL_BASE = "";
export const API_URL = `${URL_BASE}/api`;

export const invalid_type_error = "El tipo provisto es invalido";
export const required_error = "El campo es requerido";

export const nameRoutes = {
  login: "/auth",
  register: "/register",
  changePassword: "/change-password",
  settings: "/change-password",
  evidence: "/evidences",
  user: "/users",
  root: "/",
  notFound: "*",
  forbidden: "/forbidden",
  unauthorized: "/unauthorized",
  error: "/error",
  create: "create",
  edit: "update",
  authorize: "authorize",
};

export const authInitialState: InitialAuth = {
  isLoggedIn: false,
  redirect: false,
  email: "",
  token: "",
  userName: "",
  name: "",
  userId: 0,
  operations: [],
};

export const PAGINATION_OPTIONS = {
  rowsPerPageText: "Elementos Por página",
  rangeSeparatorText: "de",
  selectAllRowsItem: false,
  selectAllRowsItemText: "Todos",
};

export const SELECTED_MESSAGE = {
  singular: "Elemento",
  plural: "Elementos",
  message: "Seleccionado(s)",
};

export const MULTIPART_HEADERS = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const AUTHORIZATION_STATES = {
  pendient: 1,
  authorized: 2,
  rejected: 3,
};

export const initialUser: UserRequest = {
  id: undefined,
  rolId: 0,
  name: "",
  email: "",
  password: "",
  state: true,
};

export const rol: RolRequest = {
  id: 0,
  name: "",
  description: "",
  state: true,
};
