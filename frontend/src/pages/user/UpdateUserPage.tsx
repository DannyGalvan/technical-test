import { addToast } from "@heroui/toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useParams } from "react-router";
import { UserForm } from "../../components/form/UserForm";
import { LoadingComponent } from "../../components/spinner/LoadingComponent";
import { getUserById, updateUser } from "../../services/userService";
import type { UserRequest } from "../../types/UserRequest";
import { validationFailureToString } from "../../utils/converted";

export function UpdateUserPage() {
  const { id } = useParams();
  const client = useQueryClient();

  const {
    data: userToUpdate,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userToUpdate", id],
    queryFn: () => getUserById(Number(id)),
  });

  const onSubmit = useCallback(
    async (form: UserRequest) => {
      form.createdBy = null;
      const response = await updateUser(form);

      if (!response.success) {
        addToast({
          title: "Error",
          description: `${response.message} ${validationFailureToString(response.data)}`,
        });
        return response;
      }

      await client.invalidateQueries({ queryKey: ["users"] });
      await client.invalidateQueries({ queryKey: ["userToUpdate", id] });

      addToast({
        title: "Success",
        description: "Usuario actualizado correctamente",
        color: "success",
      });

      return response;
    },
    [client, id],
  );

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-4">
        Actualizar Usuario
      </h1>
      {userToUpdate?.success ? (
        <UserForm
          initialForm={userToUpdate?.data}
          type="edit"
          onSubmit={onSubmit}
        />
      ) : (
        <div>
          Error: {error instanceof Error ? error.message : "Unknown error"}
        </div>
      )}
    </div>
  );
}
