import { Button } from "@heroui/button";
import { Drawer, DrawerContent, DrawerFooter } from "@heroui/drawer";
import type { StoreApi, UseBoundStore } from "zustand";
import type { CommonModalStoreState } from "../../types/CommonModalStore";

export default function RequestDrawer({
  store,
}: {
  readonly store: UseBoundStore<StoreApi<CommonModalStoreState>>;
}) {
  const { open, toggleOpen, component } = store();

  return (
    <Drawer
      backdrop="blur"
      isDismissable={false}
      isOpen={open}
      scrollBehavior="inside"
      size="5xl"
      onOpenChange={toggleOpen}
    >
      <DrawerContent>
        {(onClose) => (
          <>
            {component}
            <DrawerFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cerrar
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
