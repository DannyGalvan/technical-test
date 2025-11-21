import type { ChangeEvent, FormEvent, SetStateAction } from "react";
import { useEffect, useState } from "react";

import { addToast } from "@heroui/toast";
import { useErrorsStore } from "../stores/useErrorsStore";
import type { ApiResponse } from "../types/ApiResponse";
import { ApiError } from "../types/errors";
import { errorObjectToString } from "../utils/converted";
import { useResponse } from "./useResponse";

export interface ErrorObject {
  [key: string]: string | string[];
}

export const useForm = <T, U>(
  initialForm: T,
  validateForm: (
    form: T,
    transformData: (data: SetStateAction<T>) => void,
  ) => ErrorObject,
  peticion: (form: T) => Promise<ApiResponse<U>>,
  reboot?: boolean,
) => {
  const { setError } = useErrorsStore();
  const [form, setForm] = useState<T>(initialForm);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    success,
    handleApiResponse,
    dataResult,
    fieldErrors,
    apiMessage,
    setErrorsResponse,
  } = useResponse<U>();

  useEffect(() => {
    setForm(initialForm);
  }, [initialForm]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const newForm = {
      ...form,
      [name]: value,
    };

    setForm(newForm);
    setErrorsResponse(validateForm(newForm, setForm));
  };

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    const newForm = {
      ...form,
      [name]: files ? files[0] : null,
    };

    setForm(newForm);

    setErrorsResponse(validateForm(newForm, setForm));
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const valErr = validateForm(form, setForm);
    setErrorsResponse(valErr);
    setLoading(true);

    if (Object.keys(valErr).length === 0) {
      try {
        const response = await peticion(form);

        if (response.success && reboot) {
          console.log("Rebooting form after successful submission");
          // Reset form
          e.target.dispatchEvent(
            new Event("reset", {
              bubbles: true,
              cancelable: true,
              composed: true,
            }),
          );
          setForm(initialForm); // Reiniciar el formulario con los valores iniciales
        }

        handleApiResponse(response);
      } catch (error: unknown) {
        if (error instanceof ApiError) {
          setError({
            statusCode: error.statusCode,
            message: error.message,
            name: error.name,
          });
        } else {
          const errObj = error as ApiError;
          handleApiResponse({
            success: false,
            data: null,
            message: `${errObj.name ?? "Unknown error"} ${errObj.stack ?? ""}`,
            totalResults: 0,
          });
        }
      }
    } else {
      handleApiResponse({
        success: false,
        data: null,
        message: "Error en la validación del formulario",
        totalResults: 0,
      });
      addToast({
        title: "Error",
        description: errorObjectToString(fieldErrors),
        color: "danger",
      });
    }
    setLoading(false);
  };

  return {
    form,
    loading,
    handleBlur,
    handleChange,
    handleChangeFile,
    handleSubmit,
    success,
    response: dataResult,
    errors: fieldErrors,
    message: apiMessage,
    setErrorsResponse,
    setForm,
  };
};