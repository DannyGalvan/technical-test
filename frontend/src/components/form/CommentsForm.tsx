import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import { ModalBody, ModalHeader } from "@heroui/modal";
import { addToast } from "@heroui/toast";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useAuthorizationStore } from "../../stores/useAuthorizationStore";
import type { ApiResponse } from "../../types/ApiResponse";
import type { EvidenceResponse } from "../../types/EvidenceResponse";

interface CommentsFormProps {
  readonly submitFn: (
    comments: string,
  ) => Promise<ApiResponse<EvidenceResponse>>;
}

function CommentsForm({ submitFn }: CommentsFormProps) {
  const { toggleOpen } = useAuthorizationStore();
  const [isLoading, setIsLoading] = useState(false);
  const client = useQueryClient();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      const formData = new FormData(e.target as HTMLFormElement);
      const comments = formData.get("comments") as string;
      const result = await submitFn(comments);
      if (!result.success) {
        addToast({
          title: "Error al autorizar",
          description: result.message,
          color: "danger",
        });
      }

      await client.invalidateQueries({
        queryKey: ["evidencesPending"],
        exact: false,
      });

      await client.invalidateQueries({
        queryKey: ["traceabilityAll"],
        exact: false,
      });

      addToast({
        title: "Autorización exitosa",
        description: "La solicitud ha sido autorizada correctamente.",
        color: "success",
      });
      toggleOpen();
      e.currentTarget.reset();
      setIsLoading(false);
    },
    [submitFn, client, toggleOpen],
  );

  return (
    <>
      <ModalHeader> Comentarios de la autorizacion </ModalHeader>
      <ModalBody>
        <form className="flex flex-col gap-4 p-6" onSubmit={handleSubmit}>
          <Textarea
            required
            className="w-full"
            label="Comentarios"
            maxLength={500}
            name="comments"
            placeholder="Escribe tus comentarios aquí..."
            rows={4}
          />
          <Button
            className="mt-2"
            color="primary"
            isLoading={isLoading}
            type="submit"
          >
            Continuar
          </Button>
        </form>
      </ModalBody>
    </>
  );
}

export default CommentsForm;
