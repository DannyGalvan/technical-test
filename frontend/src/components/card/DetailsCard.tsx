import { ModalBody, ModalHeader } from "@heroui/modal";
import { useAuthorizationStore } from "../../stores/useAuthorizationStore";
import { LabelText } from "../pure/LabelText";

export function DetailsCard() {
  const { request } = useAuthorizationStore();
  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        Detalles del Expediente {request?.id}
      </ModalHeader>
      <ModalBody>
        <p className="text-gray-600">
          Aquí se mostrará la información de los detalles del expediente.
        </p>
        <div className="flex flex-col gap-2 my-4">
          <LabelText label="Id" text={request?.id.toString() ?? ""} />
          <LabelText label="Descripción" text={request?.description ?? ""} />
          <LabelText
            label="Estado"
            text={request?.documentStatus?.name ?? ""}
          />
          <LabelText label="Solicitante" text={request?.user?.name ?? ""} />
          <LabelText
            label="Autorizado Por"
            text={request?.authorizeUser?.name ?? "Pendiente"}
          />
          <LabelText label="Creado" text={request?.createdAt ?? ""} />
        </div>
        <div>
          <p className="text-center font-bold text-2xl my-2">Items Adjuntos</p>
          <div className="grid grid-cols-2 gap-4">
            {request?.items?.map((item) => (
              <div
                key={item.id}
                className="p-4 shadow-lg rounded-3xl bg-primary-50"
              >
                <LabelText label="Descripcion" text={item.description} />
                <LabelText label="Color" text={item.color} />
                <LabelText label="Peso" text={`${item.weight} Lbs`} />
                <LabelText label="Tamaño" text={item.size} />
                <LabelText label="Ubicacion" text={item.location} />
                <LabelText label="Tecnico" text={item.userId.toString()} />
              </div>
            ))}
          </div>
        </div>
      </ModalBody>
    </>
  );
}
