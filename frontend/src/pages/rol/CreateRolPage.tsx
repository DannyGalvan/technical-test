import { addToast } from "@heroui/toast";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { RolForm } from "../../components/form/RolForm";
import { initialRol } from "../../configs/constants";
import { createRol } from "../../services/rolService";
import type { RolRequest } from "../../types/RolRequest";
import { validationFailureToString } from "../../utils/converted";

export function CreateRolPage() {
  const client = useQueryClient();

  const onSubmit = useCallback(
    async (form: RolRequest) => {
      const response = await createRol(form);

      if (!response.success) {
        addToast({
          title: "Error",
          description: `${response.message} ${validationFailureToString(response.data)}`,
          color: "danger",
        });
        return response;
      }

      await client.invalidateQueries({ queryKey: ["rols"] });

      addToast({
        title: "Success",
        description: "Rol creado correctamente",
        color: "success",
      });

      return response;
    },
    [client],
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-4">Crear Rol</h1>
      <RolForm initialForm={initialRol} type="create" onSubmit={onSubmit} />
    </div>
  );
}
