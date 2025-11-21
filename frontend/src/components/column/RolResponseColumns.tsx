import type { RolResponse } from "../../types/RolResponse";
import type { TableColumnWithFilters } from "../../types/TableColumnWithFilters";
import { RolButton } from "../button/RolButton";

export const RolResponseColumns: TableColumnWithFilters<RolResponse>[] = [
  {
    id: "id",
    name: "ID",
    selector: (data) => data.id ?? "",
    sortable: true,
    wrap: true,
    omit: false,
    hasFilter: true,
    filterField: (value) => (value ? `id:eq:${value}` : ""),
  },
  {
    id: "name",
    name: "Nombre",
    selector: (data) => data.name ?? "",
    sortable: true,
    wrap: true,
    omit: false,
    hasFilter: true,
    filterField: (value) => (value ? `name:like:${value}` : ""),
  },
  {
    id: "description",
    name: "Descripción",
    selector: (data) => data.description ?? "",
    sortable: true,
    wrap: true,
    omit: false,
    hasFilter: true,
    filterField: (value) => (value ? `description:like:${value}` : ""),
  },
  {
    id: "actions",
    name: "Acciones",
    maxWidth: "100px",
    center: true,
    button: true,
    cell: (data) => <RolButton data={data} />,
  },
  {
    id: "createdAt",
    name: "Creado",
    selector: (data) => data.createdAt ?? "",
    sortable: true,
    maxWidth: "160px",
    omit: true,
  },
  {
    id: "updatedAt",
    name: "Actualizado",
    selector: (data) => data.updatedAt ?? "",
    sortable: true,
    maxWidth: "160px",
    omit: true,
  },
];
