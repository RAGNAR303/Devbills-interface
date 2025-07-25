import { AlertCircle, ArrowDown, ArrowUp, Plus, Search, Trash } from "lucide-react";
import { Link } from "react-router";
import MonthYearSelect from "../components/MonthYearSelect";
import { useEffect, useState, type ChangeEvent } from "react";
import Input from "../components/Input";
import Card from "../components/Card";
import { TransactionType, type Transaction } from "../types/transactions";
import { deleteTransactions, getTransactions } from "../services/transactionService";
import Button from "../components/Button";
import { formatCurrency, formatDate } from "../utils/formatter";
import { toast } from "react-toastify";

const Transactions = () => {
  // Pegando data atual
  const currentDate = new Date();

  const [year, setYear] = useState<number>(currentDate.getFullYear());
  const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);

  const [deleteiD, setDeleteiD] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");

  console.log({ transactions });

  const fetchTransactions = async (): Promise<void> => {
    try {
      setLoading(true); // ligar o loading
      setError(""); // limpar o erro recarregar
      const data = await getTransactions({ month, year }); // Trazendo as transaçoes da API
      setTransactions(data); // colocando os dados na variavel "transactions" para renderizar na tela
      setFilteredTransactions(data); // coloca transação filtradas pela pesquisa
      console.log(data);
    } catch {
      setError("Não foi possível carregar as transações , tente novamente"); // /colocando mensagem de erro no "error"
    } finally {
      setLoading(false); // Deliga o loading
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    try {
      setDeleteiD(id); // chamada o id que foi selecinado do array
      await deleteTransactions(id); // manda o id para transantionService para ir na API para exclusão
      setTransactions((transactions) => transactions.filter((t) => t.id !== id)); // cria um novo array com o mesmo itens, porém o que foi excluido(id) nao entra
      toast.success("Transação excluído com sucesso"); // Mensagem de Sucesso => usanso toastify
    } catch (err) {
      console.error(err);
      toast.error("Falha ao deletar Transação"); // Mensagem de Falha => usanso toastify
    } finally {
      setDeleteiD("");
    }
  };
  const confirmDelete = (id: string): void => {
    // Faz aparecer um janela de confimação
    if (window.confirm("Deseja deletar essa Transação?")) {
      // se confirmado manda uma o ID para função(handleDelete) responsável em ir API atualizar as infomações
      handleDelete(id);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchTransactions();
  }, [month, year]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchText(event.target.value);
    setFilteredTransactions(
      transactions.filter((transaction) => {
        const targetValue = event.target.value.toLowerCase();
        const description = transaction.description.toLowerCase().includes(targetValue);
        const categoryName = transaction.category.name.toLowerCase().includes(targetValue);

        const amount = transaction.amount.toString().includes(targetValue);

        const data = transaction.date.toString().includes(targetValue);

        return amount || categoryName || description || data;
      }),
    );
  };

  return (
    <div className="container-app py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Transações</h1>
        <Link
          to={"/transacoes/nova"}
          className="bg-primary-500 text-[#051626] font-semibold px-4 py-2.5 rounded-xl 
        flex items-center justify-center hover:bg-primary-600 transition-all"
        >
          <Plus className="w-4 h-4 mr-0.5" />
          Nova Trasação
        </Link>
      </div>
      <Card className="mb-6">
        <MonthYearSelect
          month={month}
          year={year}
          onMonthChange={setMonth}
          onYearChange={setYear}
        />
      </Card>
      <Card className="mb-6">
        <Input
          placeholder="Buscar transações..."
          icon={<Search className="w-4 h-4" />}
          fullWidth
          onChange={handleSearchChange} // quanto tiver alteração input.
          value={searchText} // Pegar  o valor que esta no input
        />
      </Card>
      <Card className="overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="border-4  border-t-transparent border-primary-500 border-solid rounded-full w-10 h-10 animate-spin z-10 " />
          </div>
        ) : error ? (
          <div className="flex flex-col  p-8 items-center gap-2 text-gray-500">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p>{error}</p>
            <Button onClick={fetchTransactions}>Tentar novamente</Button>
          </div>
        ) : transactions?.length === 0 ? (
          <div className=" flex flex-col text-gray-500 py-12 justify-center items-center">
            <Search size={60} />
            <p className=" mb-4">Nenhuma transação encontrada</p>
            <Link
              to={"/transacoes/nova"}
              className="bg-primary-500 text-[#051626] font-semibold px-4 py-2.5 rounded-xl 
        flex items-center justify-center hover:bg-primary-600 transition-all"
            >
              <Plus className="w-4 h-4 mr-0.5" />
              Nova Trasação
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="divide-y divide-gray-700 min-h-full w-full items-center">
              <thead>
                <tr className="text-center">
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase"
                  >
                    Descrição
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase"
                  >
                    Data
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase"
                  >
                    Categoria
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase"
                  >
                    Value
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase"
                  >
                    {""}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700  text-gray-400">
                {filteredTransactions.map((transactions) => (
                  <tr key={transactions.id} className="hover:bg-gray-800">
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-2">
                          {transactions.type === TransactionType.INCOME ? (
                            <ArrowUp className="w-4 h-4 text-primary-500" />
                          ) : (
                            <ArrowDown className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-500">
                          {transactions.description}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm  whitespace-nowrap">
                      {formatDate(transactions.date)}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      <div className="flex items-center gap-0.5">
                        <div
                          className="w-2 h-2 rounded-full mr-2"
                          style={{ background: transactions.category.color }}
                        />
                        <div>{transactions.category.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      <span
                        className={`${transactions.type === TransactionType.INCOME ? "text-primary-500" : "text-red-500"}`}
                      >
                        {formatCurrency(transactions.amount)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => confirmDelete(transactions.id)}
                        className="text-red-300 hover:text-red-500 rounded-full cursor-pointer"
                        disabled={deleteiD === transactions.id}
                      >
                        {deleteiD === transactions.id ? (
                          <span className="inline-block w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin " />
                        ) : (
                          <Trash className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};
export default Transactions;
