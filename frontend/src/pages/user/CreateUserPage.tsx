import { addToast } from "@heroui/toast";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { UserForm } from "../../components/form/UserForm";
import { initialUser } from "../../configs/constants";
import { createUser } from "../../services/userService";
import type { UserRequest } from "../../types/UserRequest";

export function CreateUserPage() {
  const client = useQueryClient();

  const onSubmit = useCallback(
    async (form: UserRequest) => {
      const response = await createUser(form);

      if (!response.success) {
        addToast({
          title: "Error",
          description: response.message,
          color: "danger",
        });
        return response;
      }

      await client.invalidateQueries({ queryKey: ["users"] });

      addToast({
        title: "Success",
        description: "Usuario creado correctamente",
        color: "success",
      });

      return response;
    },
    [client],
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-4">Crear Usuario</h1>
      <UserForm initialForm={initialUser} type="create" onSubmit={onSubmit} />
    </div>
  );
}
