import { ChevronLeft, ChevronRight } from "lucide-react";

interface MonthYearSelectProps {
  month: number;
  year: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
}
// Array de strings - que sera somente leitura 
const monthNames: readonly string[] = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const MonthYearSelect = ({ month, onMonthChange, year, onYearChange }: MonthYearSelectProps) => {
  // "currentYear" função que retornar o ano atual //
  const currentYear = new Date().getFullYear();

  // "years" função que cria um array de 11 posição com anos dentro que retorna baseado no ano atual "currentYear"   //
  const years: number[] = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  // funçao avanca o mês para frente // 
  const handleNextMonth = (): void => {
    if (month === 12) {
      onMonthChange(1);
      onYearChange(year + 1);
    } else {
      onMonthChange(month + 1);
    }
  };
  // funçao rertona  o mês para atras // 
  const handlePrevMonth = (): void => {
    if (month === 1) {
      onMonthChange(12);
      onYearChange(year - 1);
    } else {
      onMonthChange(month - 1);
    }
  };

 

  return (
    <div className="flex items-center justify-between bg-gray-900 rounded-lg p-3 border border-gray-700">
      <button
        type="button"
        className="p-2 rounded-full hover:bg-gray-800 hover:text-primary-500 transition-colors cursor-pointer"
        aria-label="Mês Anterior"
        onClick={handlePrevMonth}
      >
        <ChevronLeft />
      </button>
      <div className="flex gap-1"> 
        <label htmlFor="month-select" className="sr-only"> {/* ...sr-only => esconde a label na tela, masi permite que leitore de tela reconheça */}
          Selecionar Mês
        </label>
        {/* onChange => recebe um "event" ao ser selecionado mando a valor para ser reconhecido "onMonthChange" e trocar o valor  */}
        <select
          onChange={(event) => onMonthChange(Number(event.target.value))}
         value={month}
          id="month-select"
          className="bg-gray-800 border border-gray-700 rounded-md py-1 px-3 text-sm font-medium text-gray-100 outline-none focus:ring-1 ring-primary-500 cursor-pointer "
        >
          {/* mapeando o array com os meses para redenrizar na tela */}
          {monthNames.map((name, index) => (
            <option key={name} value={index + 1} className="rounded-full">
              {name}
            </option>
          ))}
        </select>
        <label htmlFor="year-select" className="sr-only">
          Selecionar Ano
        </label>
        <select
          value={year}
          id="year-select"
   
          onChange={(event) => onYearChange(Number(event.target.value))}
          className="bg-gray-800 border border-gray-700 rounded-md py-1 px-3 text-sm font-medium text-gray-100 outline-none focus:ring-1 ring-primary-500 cursor-pointer"
        >
          {years.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="button"
        className="p-2 rounded-full hover:bg-gray-800 hover:text-primary-500 transition-colors"
        aria-label="Proximo Mês "
        onClick={handleNextMonth}
      >
        <ChevronRight className="cursor-pointer" />
      </button>
    </div>
  );
};

export default MonthYearSelect;
