import { TransactionType } from "../types/transactions";

interface TransactionTypeSelectProps {
  value: TransactionType;
  id?: string;
  onChange: (type: TransactionType) => void;
}

const TransactionTypeSelect = ({ onChange, value, id }: TransactionTypeSelectProps) => {
  const TransactionTypeButtons = [
    {
      type: TransactionType.EXPENSE,
      label: "Despesa",
      activeClasses: "bg-red-500 border-red-500 text-red-700 font-bold",
      inativeClasses: "bg-red-500/10 border-red-300 text-red-500 hover:bg-red-50",
    },
    {
      type: TransactionType.INCOME,
      label: "Receita",
      activeClasses: "bg-green-500 border-green-500 text-green-700 font-bold",
      inativeClasses: "bg-green-500/10 border-green-300 text-green-500 hover:bg-green-50",
    },
  ];

  return (
    <fieldset id={id} className="grid grid-cols-2 gap-1.5">
      <legend>Tipo de Transação</legend>

      {TransactionTypeButtons.map((item) => (
        <button
          key={item.type}
          type="button"
          onClick={() => onChange(item.type)}
          className={`flex items-center justify-center border-2 rounded-md py-2 px-4 transition-all cursor-pointer
          ${value === item.type ? item.activeClasses : item.inativeClasses}
          `}
        >
          {item.label}
        </button>
      ))}
    </fieldset>
  );
};

export default TransactionTypeSelect;
