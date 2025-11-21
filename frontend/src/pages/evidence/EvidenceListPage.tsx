import { useCallback } from "react";
import { EvidenceResponseColumns } from "../../components/column/EvidenceResponseColumns";
import RequestModal from "../../components/modal/RequestModal";
import { TableServer } from "../../components/table/TableServer";
import { useAuth } from "../../hooks/useAuth";
import Protected from "../../routes/middlewares/Protected";
import { getEvidences } from "../../services/evidenceService";
import { useAuthorizationStore } from "../../stores/useAuthorizationStore";
import { useEvidenceStore } from "../../stores/useEvidenceStore";
import { compactGrid } from "../../theme/tableTheme";
import { constructFilters } from "../../utils/converted";

export function EvidenceListPage() {
  const { userId } = useAuth();
  const { documentFilters, setDocumentFilters } = useEvidenceStore();

  const queryFn = useCallback(
    async (filters: string, page: number, pageSize: number) => {
      return getEvidences({
        pageNumber: page,
        pageSize,
        filters: constructFilters(`${filters} AND userId:eq:${userId}`),
        include: "expedientItems,documentStatus,user,authorizedUser",
        includeTotal: true,
      });
    },
    [userId],
  );

  return (
    <Protected>
      <div className="px-10">
        <h1 className="text-center font-bold text-2xl">Mis Expedientes</h1>
        <TableServer
          hasFilters
          columns={EvidenceResponseColumns}
          filters={documentFilters}
          queryFn={queryFn}
          queryKey="evidences"
          setFilters={setDocumentFilters}
          styles={compactGrid}
          text="expedientes"
          title="Expedientes Solicitados"
        />
      </div>
      <RequestModal store={useAuthorizationStore} />
    </Protected>
  );
}
