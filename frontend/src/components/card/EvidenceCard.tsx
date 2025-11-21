import { Button } from "@heroui/button";
import { useCallback } from "react";
import { useExpedientPageStore } from "../../stores/useExpedientPageStore";
import type { EvidenceItemRequest } from "../../types/EvidenceItemRequest";
import { Icon } from "../icons/Icon";
import { LabelText } from "../pure/LabelText";

interface EvidenceCardProps {
  readonly data: EvidenceItemRequest;
}

export function EvidenceCard({ data }: EvidenceCardProps) {
  const { removeRangeItem } = useExpedientPageStore();

  const handleRemove = useCallback(() => {
    removeRangeItem(data.id!);
  }, [data.id, removeRangeItem]);

  return (
    <div key={data.id} className="p-4 shadow-lg rounded-3xl bg-primary-50">
      <Button
        isIconOnly
        className="float-right"
        color="danger"
        startContent={<Icon name="bi bi-trash" />}
        variant="light"
        onPress={handleRemove}
      />
      <LabelText label="Descripcion" text={data.description ?? ""} />
      <LabelText label="Color" text={data.color ?? ""} />
      <LabelText label="Peso" text={`${data.weight ?? ""} Lbs`} />
      <LabelText label="Tamaño" text={data.size ?? ""} />
      <LabelText label="Ubicacion" text={data.location ?? ""} />
    </div>
  );
}
