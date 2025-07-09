import { useEffect, useState } from "react";
import MonthYearSelect from "../components/MonthYearSelect";
import { getTransactionsSummary } from "../services/transactionService";
import type { TransactionSummary } from "../types/transactions";
import Card from "../components/Card";
import { BanknoteArrowDown, BanknoteArrowUp, Wallet } from "lucide-react";
import { formatCurrency } from "../utils/formatter";

const initialSummary: TransactionSummary = {
  totalExpenses: 0,
  totalIncomes: 0,
  balance: 0,
  expensesByCategory: [],
};

const Dashboard = () => {
  const currentDate = new Date();
  const [year, setYear] = useState<number>(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [summary, setSummary] = useState<TransactionSummary>(initialSummary);

  useEffect(() => {
    async function loadTransactionsSummary() {
      const response = await getTransactionsSummary(month, year);

      setSummary(response);
      console.log(response);
    }

    loadTransactionsSummary();
  }, [month, year]);

  return (
    <div className="container-app py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Dashbord</h1>
        <MonthYearSelect
          month={month}
          year={year}
          onMonthChange={setMonth}
          onYearChange={setYear}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          glowEffect={summary.balance > 0}
          hover
          title="Saldo"
          subtitle="Valor no Mês"
          icon={<Wallet className="text-primary-500" />}
        >
          <div>
            <p
              className={`text-2xl font-semibold mt-2 ${summary.balance > 0 ? "text-primary-500" : "text-red-400"}`}
            >
              {formatCurrency(summary.balance)}
            </p>
          </div>
        </Card>

        <Card
          glowEffect
          hover
          title="Receitas"
          subtitle="Valor no Mês"
          icon={<BanknoteArrowUp className="text-primary-500" />}
        >
          <div>
            <p className="text-2xl font-semibold text-primary-500">
              {formatCurrency(summary.totalIncomes)}
            </p>
          </div>
        </Card>

        <Card
          glowEffect
          hover
          title="Despesas"
          subtitle="Valor no Mês"
          icon={<BanknoteArrowDown className="text-red-700" />}
        >
          <div>
            <p className="text-2xl font-semibold text-red-700">
              {formatCurrency(summary.totalExpenses)}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default Dashboard;
