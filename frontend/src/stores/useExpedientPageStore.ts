import { addToast } from "@heroui/toast";
import type { ChangeEvent } from "react";
import { create } from "zustand";
import { AUTHORIZATION_STATES } from "../configs/constants";
import { createEvidence } from "../services/evidenceService";
import type { ApiResponse } from "../types/ApiResponse";
import type { CommonModalStoreState } from "../types/CommonModalStore";
import type { EvidenceItemRequest } from "../types/EvidenceItemRequest";
import type { EvidenceRequest } from "../types/EvidenceRequest";
import {
  errorObjectToString,
  handleOneLevelZodError,
  mapValidationFailuresToFieldErrors,
} from "../utils/converted";
import { evidenceSchema } from "../validations/evidenceValidations";

interface ExpedientPageState extends CommonModalStoreState {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (reboot?: boolean) => Promise<void>;
  form: EvidenceRequest;
  setForm: (form: EvidenceRequest) => void;
  setErrorsResponse: (
    errors: Partial<Record<keyof EvidenceRequest, string>>,
  ) => void;
  errors: Partial<Record<keyof EvidenceRequest, string>>;
  isLoading: boolean;
  addRangeItem: (item: EvidenceItemRequest) => ApiResponse<void>;
  removeRangeItem: (index: number) => void;
  updateRangeItem: (item: EvidenceItemRequest) => void;
}

export const useExpedientPageStore = create<ExpedientPageState>((set, get) => ({
  open: false,
  component: null,
  isLoading: false,
  setErrorsResponse: (errors) => set({ errors }),
  setForm: (form) => {
    const parse = evidenceSchema.safeParse(form);

    if (!parse.success) {
      set({ errors: handleOneLevelZodError(parse.error) });
    } else {
      set({ errors: {} });
    }
    set({ form });
  },
  form: {
    comments: "",
    documentStatusId: AUTHORIZATION_STATES.pendient,
    description: "",
    items: [],
    state: true,
  },
  errors: {},
  toggleOpen: () => set((state) => ({ open: !state.open })),
  setComponent: (component) => set({ component }),
  addRangeItem: (item: EvidenceItemRequest) => {
    const itemRequest: EvidenceItemRequest = {
      expedientId: item.expedientId,
      id: new Date().getTime(),
      color: item.color,
      description: item.description,
      size: item.size,
      weight: parseFloat(item.weight?.toString() || "0"),
      location: item.location,
      state: item.state,
    };

    const newState = {
      ...get().form,
      items: [...(get().form.items || []), itemRequest],
    };

    const parse = evidenceSchema.safeParse(newState);

    if (!parse.success) {
      set({ errors: handleOneLevelZodError(parse.error) });
      addToast({
        title: "Error",
        description:
          "Por favor, corrija los errores en el formulario." +
          errorObjectToString(handleOneLevelZodError(parse.error)),
        color: "danger",
      });
    } else {
      set({ errors: {} });
    }

    addToast({
      title: "Éxito",
      description: "evidencia agregada exitosamente.",
      color: "success",
    });

    set({ form: newState, open: false });

    return {
      success: true,
      message: "evidencia agregada exitosamente.",
      data: undefined,
      totalResults: 1,
    };
  },
  removeRangeItem: (index: number) => {
    const newState = {
      ...get().form,
      items: get().form.items!.filter((item) => item.id !== index),
    };
    const parse = evidenceSchema.safeParse(newState);

    if (!parse.success) {
      set({ errors: handleOneLevelZodError(parse.error) });
    } else {
      set({ errors: {} });
    }

    set({ form: newState });
  },
  updateRangeItem: (item: EvidenceItemRequest) =>
    set((state) => ({
      form: {
        ...state.form,
        items: state.form.items!.map((ri) => (ri.id === item.id ? item : ri)),
      },
    })),
  handleChange: (e) => {
    const { name, value } = e.target;

    const newState = {
      ...get().form,
      [name]: value,
    };

    const parse = evidenceSchema.safeParse(newState);

    if (!parse.success) {
      set({ errors: handleOneLevelZodError(parse.error) });
    } else {
      set({ errors: {} });
    }

    set({ form: newState });
  },
  handleSubmit: async (reboot = true) => {
    const { form } = get();

    const parse = evidenceSchema.safeParse(form);

    form.items = form.items?.map((item) => ({
      ...item,
      id: undefined,
    }));

    if (!parse.success) {
      const errors = handleOneLevelZodError(parse.error);
      set({ errors });
      addToast({
        title: "Error",
        description:
          "Por favor, corrija los errores en el formulario." +
          errorObjectToString(errors),
        color: "danger",
      });
      return;
    }

    set({ isLoading: true });

    const response = await createEvidence(form);

    console.log("evidenceResponse", response);

    if (!response.success) {
      set({
        isLoading: false,
        errors: {
          ...get().errors,
          ...mapValidationFailuresToFieldErrors(response.data),
        },
      });
      addToast({
        title: "Error",
        description:
          "Por favor, corrija los errores en el formulario." +
          errorObjectToString(get().errors),
        color: "danger",
      });
      return;
    }

    addToast({
      title: "Éxito",
      description: "Evidencia creada exitosamente.",
      color: "success",
    });

    if (reboot) {
      set({
        form: {
          documentStatusId: AUTHORIZATION_STATES.pendient,
          description: "",
          comments: "",
          state: true,
          items: [],
        },
      });
    }

    set({ isLoading: false });
  },
}));
