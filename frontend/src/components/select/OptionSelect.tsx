import { useCallback } from "react";
import Select, {
  type ActionMeta,
  type GroupBase,
  type MultiValue,
  type OptionsOrGroups,
  type SelectInstance,
  type SingleValue,
} from "react-select";

export type OptionValue =
  | SingleValue<{ label: string; value: string }>
  | MultiValue<{ label: string; value: string }>
  | null;

type Option = { label: string; value: string };

interface OptionSelectProps {
  readonly label: string;
  readonly name: string;
  readonly options: OptionsOrGroups<Option, GroupBase<Option>>;
  readonly defaultValue?: OptionValue;
  readonly isMulti?: boolean;
  readonly isInvalid?: boolean;
  readonly errorMessage?: string;
  readonly placeholder?: string;
  readonly isReadOnly?: boolean;
  readonly ref?: React.Ref<SelectInstance<{ label: string; value: string }>>;
  readonly onChange?:
    | ((newValue: OptionValue, actionMeta: ActionMeta<OptionValue>) => void)
    | undefined;
  readonly isRequired?: boolean;
}

export function OptionsSelect({
  label,
  name,
  options,
  defaultValue,
  isMulti = false,
  isInvalid = false,
  isReadOnly = false,
  isRequired = false,
  errorMessage = "",
  placeholder = "Select an option",
  onChange,
  ref,
}: OptionSelectProps) {
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
        <Select
          ref={ref}
          backspaceRemovesValue
          isClearable
          tabSelectsValue
          classNamePrefix="react-select"
          defaultValue={defaultValue}
          isDisabled={isReadOnly}
          isMulti={isMulti}
          name={name}
          noOptionsMessage={noOptionsMessage}
          options={options}
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
          onChange={onChange}
        />
      </div>
      <p className="text-red-500 text-sm">{errorMessage}</p>
    </div>
  );
}
