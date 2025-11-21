import { useCallback } from "react";
import { RolResponseColumns } from "../../components/column/RolResponseColumns";
import { TableServer } from "../../components/table/TableServer";
import { getRols } from "../../services/rolService";
import { useRolStore } from "../../stores/useRolStore";
import { compactGrid } from "../../theme/tableTheme";

export function RolPage() {
  const { filters, setFilters } = useRolStore();

  const queryFn = useCallback(
    async (filters: string, page: number, pageSize: number) => {
      return getRols({
        pageNumber: page,
        pageSize,
        filters,
        include: null,
        includeTotal: false,
      });
    },
    [],
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-4">Listado de Roles</h1>
      <TableServer
        hasFilters
        columns={RolResponseColumns}
        filters={filters}
        queryFn={queryFn}
        queryKey="rols"
        setFilters={setFilters}
        styles={compactGrid}
        text="roles"
        title="Roles"
      />
    </div>
  );
}
