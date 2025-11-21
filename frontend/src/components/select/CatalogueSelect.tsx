import { useCallback } from "react";
import type { MultiValue, SingleValue } from "react-select";
import AsyncSelect from "react-select/async";
import { useErrorsStore } from "../../stores/useErrorsStore";
import type { ApiResponse } from "../../types/ApiResponse";
import type { CatalogueResponse } from "../../types/CatalogueResponse";
import type {
  filterOptions,
  filtersCatalogueOptions,
} from "../../types/FilterTypes";
import type { ApiError } from "../../types/errors";

interface BaseCatalogueSelectProps {
  label: string;
  defaultValue?: { label: string; value: string } | null;
  name?: string;
  placeholder?: string;
  deps?: string;
  cacheOptions?: boolean;
  defaultOptions?: boolean;
  errorMessage?: string;
  isMulti?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (
    option:
      | SingleValue<{ label: string; value: string }>
      | MultiValue<{ label: string; value: string }>
      | null,
  ) => void;
}

// Opción A: `catalogue` está presente → `queryFn` y `selectorFn` son opcionales
export interface CatalogueOption<T> extends BaseCatalogueSelectProps {
  type: "catalogue";
  catalogue: string;
  fieldSearch?: string;
  queryFn: (
    options: filtersCatalogueOptions,
  ) => Promise<ApiResponse<CatalogueResponse[]>>;
  selectorFn?: (item: T) => { label: string; value: string };
  include?: string | null;
}

// Opción B: no hay `catalogue` → `queryFn` y `selectorFn` son obligatorios
export interface CustomOption<T> extends BaseCatalogueSelectProps {
  type: "custom";
  catalogue?: undefined;
  fieldSearch: string;
  queryFn: (options: filterOptions) => Promise<ApiResponse<T[]>>;
  selectorFn?: (item: T) => { label: string; value: string };
  include?: string | null;
}

// Unión de ambas opciones válidas
export type CatalogueSelectProps<T> = CatalogueOption<T> | CustomOption<T>;

const constructQuery = (
  inputValue: string,
  deps: string,
  fieldSearch: string,
): string => {
  let value = "";

  if (inputValue) {
    value = `${fieldSearch}:like:${inputValue}`;
  }

  if (deps) {
    value += ` AND ${deps}`;
  }

  if (value.startsWith(" AND ")) {
    value = value.slice(5); // Eliminar el prefijo " AND " si existe
  }

  return value;
};

export function CatalogueSelect<T extends object>({
  catalogue,
  label,
  defaultValue,
  name,
  placeholder = "Selecciona una opción",
  deps,
  queryFn,
  selectorFn,
  fieldSearch,
  onChange,
  cacheOptions = true,
  defaultOptions = true,
  errorMessage = "",
  isMulti = false,
  isInvalid = false,
  include = null,
  type,
  onBlur,
  isRequired = true,
}: CatalogueSelectProps<T>) {
  const { setError } = useErrorsStore();

  const catalogueOptions = useCallback(
    async (inputValue: string) => {
      try {
        if (queryFn && catalogue && type === "catalogue") {
          const response = await queryFn({
            filters: constructQuery(inputValue, deps || "", "Name"),
            include: null,
            includeTotal: false,
            pageNumber: 1,
            pageSize: 100,
            catalogue: catalogue,
          });
          return response?.success
            ? response.data.map((item) => ({
                label: item.name,
                value: String(item.id),
              }))
            : [];
        } else if (queryFn && selectorFn && fieldSearch && type === "custom") {
          const response = await queryFn({
            filters: constructQuery(
              inputValue,
              deps || "",
              fieldSearch || "Name",
            ),
            include: include,
            includeTotal: false,
            pageNumber: 1,
            pageSize: 100,
          });

          return response?.success
            ? response.data.map((item) =>
                selectorFn
                  ? selectorFn(item)
                  : {
                      label: "label",
                      value: "item",
                    },
              )
            : [];
        } else return [];
      } catch (error) {
        console.error("Error fetching catalogue options:", error);
        setError(error as ApiError);
        return [];
      }
    },
    [
      catalogue,
      deps,
      queryFn,
      selectorFn,
      fieldSearch,
      setError,
      include,
      type,
    ],
  );

  const loadingMessage = useCallback(
    (obj: { inputValue: string }) => <div>Cargando {obj.inputValue}...</div>,
    [],
  );

  const noOptionsMessage = useCallback(() => {
    return "No hay opciones disponibles";
  }, []);

  return (
    <div>
      <div
        className={`rounded-xl ${isInvalid ? "bg-danger-50 hover:bg-danger-100" : "bg-gray-100 hover:bg-gray-200"}`}
      >
        <label
          className={`${isInvalid ? "text-red-500" : "text-gray-500"} text-xs ms-3`}
          htmlFor={label}
        >
          {label} {isRequired ? <span className="text-red-500">*</span> : null}
        </label>
        <AsyncSelect
          key={`${deps}-${catalogue}-${fieldSearch}-${defaultValue?.value}`}
          backspaceRemovesValue
          isClearable
          tabSelectsValue
          cacheOptions={cacheOptions}
          classNamePrefix="react-select"
          defaultOptions={defaultOptions}
          defaultValue={defaultValue}
          isMulti={isMulti}
          loadOptions={catalogueOptions}
          loadingMessage={loadingMessage}
          name={name}
          noOptionsMessage={noOptionsMessage}
          placeholder={placeholder}
          required={isRequired}
          styles={{
            control: (base) => ({
              ...base,
              borderRadius: "0.5rem",
              borderColor: "transparent",
              boxShadow: "none",
              backgroundColor: "transparent",
              fontSize: "0.875rem",
              ":hover": {
                ...base[":hover"],
                borderColor: "transparent",
              },
            }),
            menu: (base) => ({
              ...base,
              borderRadius: "0.5rem",
              backgroundColor: "#f8f9fa",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              zIndex: 11,
            }),
            menuList: (base) => ({
              ...base,
              zIndex: 11,
              maxHeight: "150px",
              overflowY: "auto",
              padding: "0.5rem",
            }),
            placeholder: (base) => ({
              ...base,
              color: isInvalid ? "#dc2626" : "#6b7280",
            }),
            singleValue: (base) => ({
              ...base,
              color: isInvalid ? "#dc2626" : "#212529",
            }),
            multiValue: (base) => ({
              ...base,
              backgroundColor: isInvalid ? "#f87171" : "#e2e8f0",
            }),
          }}
          onBlur={onBlur}
          onChange={onChange}
        />
      </div>
      <p className="text-red-500 text-sm">{errorMessage}</p>
    </div>
  );
}
