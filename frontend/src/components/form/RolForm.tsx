import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useForm } from "../../hooks/useForm";
import type { ApiResponse } from "../../types/ApiResponse";
import type { RolRequest } from "../../types/RolRequest";
import type { RolResponse } from "../../types/RolResponse";
import { rolValidations } from "../../validations/rolValidations";

interface CreateRolFormProps {
  type: "create";
  initialForm: RolRequest;
  onSubmit: (form: RolRequest) => Promise<ApiResponse<RolResponse>>;
}

interface EditRolFormProps {
  type: "edit";
  initialForm: RolResponse;
  onSubmit: (form: RolRequest) => Promise<ApiResponse<RolResponse>>;
}

type RolFormProps = CreateRolFormProps | EditRolFormProps;

export function RolForm({ initialForm, onSubmit, type }: RolFormProps) {
  const { errors, form, handleChange, handleSubmit, loading } = useForm<
    RolRequest,
    RolResponse
  >(initialForm, rolValidations, onSubmit, type === "create");

  return (
    <div>
      <form className="p-10 grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
        <Input
          isRequired
          errorMessage={errors?.name}
          isInvalid={!!errors?.name}
          label="Nombre del rol"
          name="name"
          value={form.name ?? ""}
          onChange={handleChange}
        />
        <Input
          isRequired
          errorMessage={errors?.description}
          isInvalid={!!errors?.description}
          label="Descripción"
          name="description"
          value={form.description ?? ""}
          onChange={handleChange}
        />
        <Button
          className="font-bold"
          color="primary"
          isLoading={loading}
          type="submit"
        >
          {type === "create" ? "Crear Rol" : "Actualizar Rol"}
        </Button>
      </form>
    </div>
  );
}
