import { Textarea } from "@heroui/input";
import { useCallback } from "react";
import { useExpedientPageStore } from "../../stores/useExpedientPageStore";

export function ExpedientForm() {
  const { form, handleChange, handleSubmit, errors } = useExpedientPageStore();

  const handleOnSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      handleSubmit();
    },
    [handleSubmit],
  );

  return (
    <form
      className="grid grid-cols-1 gap-4"
      id="expedient-form"
      onSubmit={handleOnSubmit}
    >
      <Textarea
        isRequired
        errorMessage={errors.description}
        isInvalid={!!errors.description}
        label="Descripción"
        name="description"
        placeholder="Ingrese una descripción"
        value={form.description || ""}
        onChange={handleChange}
      />
    </form>
  );
}
