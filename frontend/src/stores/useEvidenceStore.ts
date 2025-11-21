import { create } from "zustand";
import type { ListFilter } from "../types/ListFilter";

interface EvidenceState {
  documentFilters: ListFilter;
  setDocumentFilters: (documentFilters: ListFilter) => void;
}

export const useEvidenceStore = create<EvidenceState>((set) => ({
  documentFilters: { filter: "", page: 1, pageSize: 10 },
  setDocumentFilters: (documentFilters) => set({ documentFilters }),
}));
