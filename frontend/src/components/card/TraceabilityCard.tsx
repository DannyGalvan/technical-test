import { ModalBody, ModalHeader } from "@heroui/modal";
import { Spinner } from "@heroui/spinner";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getAllTraceability } from "../../services/traceabilityService";
import { useAuthorizationStore } from "../../stores/useAuthorizationStore";
import { useErrorsStore } from "../../stores/useErrorsStore";
import type { ApiResponse } from "../../types/ApiResponse";
import type { ApiError } from "../../types/errors";
import type { RequestTraceabilityResponse } from "../../types/RequestTraceabilityResponse";

export function TraceabilityCard() {
  const { request } = useAuthorizationStore();
  const { setError } = useErrorsStore();

  const { data, isLoading, error } = useQuery<
    ApiResponse<RequestTraceabilityResponse[]>,
    ApiError
  >({
    queryKey: ["traceabilityAll", request?.id],
    queryFn: () =>
      getAllTraceability({
        include: "authorizedUser,createdUser,documentStatus",
        includeTotal: false,
        filters: `expedientId:eq:${request?.id}`,
        pageNumber: 1,
        pageSize: 100,
      }),
  });

  useEffect(() => {
    if (error) {
      setError(error);
    }
  }, [error, setError]);

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        Trazabilidad Expediente {request?.id}
      </ModalHeader>
      <ModalBody>
        <p className="text-gray-600">
          Aquí se mostrará la información de los estados por los que ha pasado
          el expediente.
        </p>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col gap-4">
            {data?.totalResults === 0 && (
              <p className="text-gray-500">No hay trazabilidad disponible.</p>
            )}
            {data?.success
              ? data?.data?.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 shadow-lg rounded-3xl bg-primary-50"
                  >
                    <h3 className="font-bold text-center text-xl underline">
                      {item.documentStatus?.name}
                    </h3>
                    <h3>Comentario: {item.comments}</h3>
                    <p>Authorizo: {item.authorizedUser?.name ?? "N/A"} </p>
                    <p>Author: {item.createdUser?.name}</p>
                    <p>Fecha de Estado: {item.createdAt}</p>
                  </div>
                ))
              : null}
          </div>
        )}
      </ModalBody>
    </>
  );
}
