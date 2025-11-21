import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useCallback } from "react";
import type { SingleValue } from "react-select";
import { useForm } from "../../hooks/useForm";
import { getRols } from "../../services/rolService";
import type { ApiResponse } from "../../types/ApiResponse";
import type { RolResponse } from "../../types/RolResponse";
import type { UserRequest } from "../../types/UserRequest";
import type { UserResponse } from "../../types/UserResponse";
import { userValidations } from "../../validations/userValidations";
import { CatalogueSelect } from "../select/CatalogueSelect";
import type { OptionValue } from "../select/OptionSelect";

interface CreateUserFormProps {
  type: "create";
  initialForm: UserRequest;
  onSubmit: (form: UserRequest) => Promise<ApiResponse<UserResponse>>;
}

interface EditUserFormProps {
  type: "edit";
  initialForm: UserResponse;
  onSubmit: (form: UserRequest) => Promise<ApiResponse<UserResponse>>;
}

type UserFormProps = CreateUserFormProps | EditUserFormProps;

export function UserForm({ initialForm, type, onSubmit }: UserFormProps) {
  const { errors, form, handleChange, handleSubmit, loading } = useForm<
    UserRequest,
    UserResponse
  >(initialForm, userValidations, onSubmit, type === "create");

  const handleSelectChange = useCallback(
    (name: string) => (opt: OptionValue) => {
      const option = opt as SingleValue<{ label: string; value: string }>;
      handleChange({
        target: { name, value: option?.value || "" },
      } as React.ChangeEvent<HTMLInputElement>);
    },
    [handleChange],
  );

  const selectorRol = useCallback(
    (item: RolResponse) => ({
      label: item.description,
      value: String(item.id),
    }),
    [],
  );

  return (
    <div className="p-10">
      <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
        <Input
          isRequired
          errorMessage={errors?.name}
          isInvalid={!!errors?.name}
          label="Nombre"
          name="name"
          value={form.name ?? ""}
          onChange={handleChange}
        />
        <Input
          isRequired
          errorMessage={errors?.email}
          isInvalid={!!errors?.email}
          label="Correo electrónico"
          name="email"
          value={form.email ?? ""}
          onChange={handleChange}
        />
        <Input
          isRequired
          errorMessage={errors?.password}
          isInvalid={!!errors?.password}
          label="Contraseña"
          name="password"
          type="password"
          value={form.password ?? ""}
          onChange={handleChange}
        />
        <CatalogueSelect
          defaultValue={
            type === "edit"
              ? {
                  label: initialForm.rol?.name ?? "",
                  value: initialForm.rolId?.toString() ?? "",
                }
              : null
          }
          errorMessage={errors?.rolId as string}
          fieldSearch="Description"
          isInvalid={!!errors?.rolId}
          label="Rol"
          name="rolId"
          queryFn={getRols}
          selectorFn={selectorRol}
          type="custom"
          onChange={handleSelectChange("rolId")}
        />
        <Button
          className="font-bold"
          color="primary"
          isLoading={loading}
          type="submit"
        >
          {type === "create" ? "Crear Usuario" : "Actualizar Usuario"}
        </Button>
      </form>
    </div>
  );
}
