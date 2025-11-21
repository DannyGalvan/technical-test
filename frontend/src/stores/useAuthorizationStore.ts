import { create } from "zustand";
import type { CommonModalStoreState } from "../types/CommonModalStore";
import type { EvidenceResponse } from "../types/EvidenceResponse";

export interface AuthorizationState extends CommonModalStoreState {
  request: EvidenceResponse | undefined | null;
  setRequest: (request: EvidenceResponse | undefined) => void;
}

export const useAuthorizationStore = create<AuthorizationState>((set) => ({
  open: false,
  component: null,
  request: null,
  toggleOpen: () => set((state) => ({ open: !state.open })),
  setRequest: (request: EvidenceResponse | null | undefined) =>
    set({ request }),
  setComponent: (component) => set({ component }),
}));
