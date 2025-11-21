import type { JSX } from "react";

export interface CommonModalStoreState {
  open: boolean;
  toggleOpen: () => void;
  component: JSX.Element | null;
  setComponent: (component: JSX.Element | null) => void;
}
