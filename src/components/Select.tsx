import { ChevronDown } from "lucide-react";
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
    <div className={`${fullWidth ? "w-full" : ""} mb-4 relative`}>
      {label && <label htmlFor={selectId}>{label}</label>}

      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 top-6 pl-3 flex items-center text-primary-500">
            {icon}
          </div>
        )}
      </div>
      {options && (
        <select
          id={selectId}
          {...rest}
          className={`block w-full bg-[#000000] rounded-xl border pl-10 px-4 py-3 transition-all focus:outline-none focus:ring-2 text-gray-500
             ${error ? "border-red-500" : "border-gray-700"} 
             ${
               error
                 ? "focus:border-red-500 focus:ring-red-500/2"
                 : "focus:border-primary-500 focus:ring-red-500/2"
             }
             appearance-none
             
             `}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 top-6">
        <ChevronDown className="h-5 w-5 text-primary-500 " />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Select;
