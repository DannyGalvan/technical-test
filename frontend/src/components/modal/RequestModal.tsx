import { Button } from "@heroui/button";
import { Modal, ModalContent, ModalFooter } from "@heroui/modal";
import type { StoreApi, UseBoundStore } from "zustand";
import type { CommonModalStoreState } from "../../types/CommonModalStore";

export default function RequestModal({
  store,
}: {
  readonly store: UseBoundStore<StoreApi<CommonModalStoreState>>;
}) {
  const { open, toggleOpen, component } = store();

  return (
    <Modal
      backdrop="blur"
      isDismissable={false}
      isOpen={open}
      scrollBehavior="inside"
      size="5xl"
      onOpenChange={toggleOpen}
    >
      <ModalContent>
        {(onClose) => (
          <>
            {component}
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
