import { Button } from "@heroui/button";
import { DrawerBody, DrawerHeader } from "@heroui/drawer";

import { Input } from "@heroui/input";
import { useForm } from "../../hooks/useForm";
import { useExpedientPageStore } from "../../stores/useExpedientPageStore";
import type { EvidenceItemRequest } from "../../types/EvidenceItemRequest";
import { validateEvidenceItem } from "../../validations/evidenceItemValidations";

const initialExpedientItem: EvidenceItemRequest = {
  expedientId: 0,
  id: 0,
  color: "",
  description: "",
  size: "",
  weight: 0,
  location: "",
  state: true,
};

export function ExpedientItemForm() {
  const { addRangeItem } = useExpedientPageStore();
  const { form, errors, handleChange, handleSubmit } = useForm<
    EvidenceItemRequest,
    void
  >(initialExpedientItem, validateEvidenceItem, addRangeItem);

  return (
    <>
      <DrawerHeader>Agregar Rango</DrawerHeader>
      <DrawerBody>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          <Input
            isRequired
            errorMessage={errors?.description}
            isInvalid={!!errors?.description}
            label="Descripción"
            name="description"
            type="text"
            value={form.description || ""}
            onChange={handleChange}
          />
          <Input
            isRequired
            errorMessage={errors?.weight}
            isInvalid={!!errors?.weight}
            label="Peso"
            name="weight"
            type="number"
            value={form.weight?.toString() || ""}
            onChange={handleChange}
          />
          <Input
            isRequired
            errorMessage={errors?.size}
            isInvalid={!!errors?.size}
            label="Tamaño"
            name="size"
            type="text"
            value={form.size}
            onChange={handleChange}
          />
          <Input
            isRequired
            errorMessage={errors?.color}
            isInvalid={!!errors?.color}
            label="Color"
            name="color"
            type="text"
            value={form.color}
            onChange={handleChange}
          />
          <Input
            isRequired
            errorMessage={errors?.location}
            isInvalid={!!errors?.location}
            label="Ubicación"
            name="location"
            type="text"
            value={form.location}
            onChange={handleChange}
          />
          <Button
            className="col-span-2 font-bold"
            color="primary"
            type="submit"
          >
            Agregar Evidencia
          </Button>
        </form>
      </DrawerBody>
    </>
  );
}
