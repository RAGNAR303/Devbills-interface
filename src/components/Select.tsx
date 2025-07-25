import { useId, type ReactNode, type SelectHTMLAttributes } from "react";

interface SelectOption {
  value: string;
  label: string;
}
// Molde de como vai mandar as informções ,  e tem o complemento do atributos de um select padrão
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
  options: SelectOption[];
}

const Select = ({
  label,
  options,
  icon,
  fullWidth = true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  className = "",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id,
  error,
  ...rest
}: SelectProps) => {

    // Cria um ID automatico
  const selectId = useId();

  return (
    <div className={`${fullWidth ? "w-full" : ""} mb-4`}>
      {label && <label htmlFor={selectId}>{label}</label>}

      <div className="relative">
        {icon && <div className="absolute inset-y-0 left-0 pl-2 flex items-center text-primary-500">{icon}</div>}
      </div>
      {options && (
        <select id={selectId} {...rest}>
          {options.map((option) => (
            <option key={option.value} value={option.value} className="text-black">
              {option.label}
            </option>
          ))}
        </select>
      )}

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Select;
