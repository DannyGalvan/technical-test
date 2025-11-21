import type { EvidenceResponse } from "../../types/EvidenceResponse";
import type { TableColumnWithFilters } from "../../types/TableColumnWithFilters";
import { EvidenceMenu } from "../button/EvidenceMenu";

export const EvidenceResponseColumns: TableColumnWithFilters<EvidenceResponse>[] =
  [
    {
      id: "id",
      name: "Id",
      selector: (data) => data.id ?? "",
      sortable: true,
      wrap: true,
      omit: false,
      hasFilter: true,
      filterField: (value) => (value ? `Id:like:${value}` : ""),
    },
    {
      id: "description",
      name: "Descripción",
      selector: (data) => data.description ?? "",
      sortable: true,
      wrap: true,
      omit: false,
    },
    {
      id: "documentStatus",
      name: "Estado",
      selector: (data) => data.documentStatus?.name ?? "",
      hasFilter: true,
      filterField: (value) =>
        value ? `documentStatus.name:like:${value}` : "",
      sortable: true,
      wrap: true,
      omit: false,
    },
    {
      id: "author",
      name: "Solicitante",
      selector: (data) => data.user?.name ?? "",
      sortable: true,
      wrap: true,
      omit: false,
    },
    {
      id: "authorizeUser",
      name: "Autorizado Por",
      selector: (data) => data.authorizeUser?.name ?? "Aún no autorizado",
      sortable: true,
      wrap: true,
      omit: false,
    },
    {
      id: "actions",
      name: "Acciones",
      maxWidth: "100px",
      center: true,
      button: true,
      cell: (data) => <EvidenceMenu data={data} />,
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
