import { Button } from "@heroui/button";
import { useCallback } from "react";
import { EvidenceCard } from "../../components/card/EvidenceCard";
import RequestDrawer from "../../components/drawer/RequestDrawer";
import { ExpedientForm } from "../../components/form/ExpedientForm";
import { ExpedientItemForm } from "../../components/form/ExpedientItemForm";
import { useExpedientPageStore } from "../../stores/useExpedientPageStore";

export function EvidenceCreatePage() {
  const { toggleOpen, setComponent, form, isLoading, errors } =
    useExpedientPageStore();

  const handleOpenExpedientItemForm = useCallback(() => {
    setComponent(<ExpedientItemForm />);
    toggleOpen();
  }, [setComponent, toggleOpen]);

  return (
    <div>
      <h1 className="text-center font-bold text-2xl">Creacion de Expediente</h1>
      <ExpedientForm />
      <div className="flex justify-end p-4">
        <Button
          className="font-bold"
          color="primary"
          onPress={handleOpenExpedientItemForm}
        >
          Agregar Evidencia
        </Button>
      </div>
      <div>
        <h2 className="font-bold text-xl text-center">Detalle de Evidencias</h2>
        {errors.items ? (
          <p className="text-red-600 text-sm text-center mb-2">
            {errors.items}
          </p>
        ) : null}
        <div className="p-4" />
        <div className="grid grid-cols-2 gap-4">
          {form.items?.map((item) => (
            <EvidenceCard key={item.id} data={item} />
          ))}
        </div>
        <div className="flex justify-end p-4">
          <Button
            className="font-bold"
            color="primary"
            form="expedient-form"
            isLoading={isLoading}
            type="submit"
          >
            Guardar Expediente
          </Button>
        </div>
        <RequestDrawer store={useExpedientPageStore} />
      </div>
    </div>
  );
}
