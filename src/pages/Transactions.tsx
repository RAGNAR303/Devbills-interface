import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Calendar,
  DollarSign,
  Plus,
  Search,
  SquarePen,
  TagIcon,
  Trash,
} from "lucide-react";
import { Link } from "react-router";
import MonthYearSelect from "../components/MonthYearSelect";
import { useEffect, useState, type ChangeEvent } from "react";
import Input from "../components/Input";
import Card from "../components/Card";
import { TransactionType, type Transaction } from "../types/transactions";
import {
  deleteTransactions,
  getTransactions,
} from "../services/transactionService";
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
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);

  const [deleteiD, setDeleteiD] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");

  const fetchTransactions = async (): Promise<void> => {
    try {
      setLoading(true); // ligar o loading
      setError(""); // limpar o erro recarregar
      const data = await getTransactions({ month, year }); // Trazendo as transaçoes da API
      setTransactions(data); // colocando os dados na variavel "transactions" para renderizar na tela
      setFilteredTransactions(data); // coloca transação filtradas pela pesquisa
    } catch {
      setError("Não foi possível carregar as transações , tente novamente"); // /colocando mensagem de erro no "error"
    } finally {
      setLoading(false); // Deliga o loading
    }
  };
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchTransactions();
  }, [month, year]);

  const handleDelete = async (id: string): Promise<void> => {
    try {
      setDeleteiD(id); // chamada o id que foi selecinado do array
      await deleteTransactions(id); // manda o id para transantionService para ir na API para exclusão
      setFilteredTransactions((transactions) =>
        transactions.filter((t) => t.id !== id)
      ); // cria um novo array com o mesmo itens, porém o que foi excluido(id) nao entra
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

  // Faz a pesquisa na tabela
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const targetValue = event.target.value.trim().toLowerCase();
    setSearchText(targetValue);

    // Se o campo estiver vazio, retorna todas as transações
    if (!targetValue) {
      setFilteredTransactions(transactions);
      return;
    }

    setFilteredTransactions(
      transactions.filter((transaction) => {
        // Valor que será recebido no Input de pesquisa
        const targetValue = event.target.value.toLowerCase();

        // Pega a descrição da Transação
        const description = transaction.description
          .toLowerCase()
          .includes(targetValue);

        // Pega a categoria da Transação
        const categoryName = transaction.category.name
          .toLowerCase()
          .includes(targetValue);
        // Pega a valor da Transação
        const amount = transaction.amount.toString().includes(targetValue);

        // Formatar a data

        return description || categoryName || amount;
      })
    );
  };

  return (
    <div className="container-app py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex justify-center items-center bg-[#0e1615]  rounded-xl border border-gray-700 p-2 px-4 mb-2 text-primary-500">
          <ArrowUpDown className="w-9 h-9 mr-2" />
          <h1 className="text-4xl font-bold  md:mb-0">Transações</h1>
        </div>
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
                <tr className="text-center ">
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold  text-white uppercase"
                  >
                    <div className="flex items-center">
                      <SquarePen className="h-3 w-3 mr-0.5" />
                      Descrição
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold  text-white uppercase"
                  >
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-0.5" />
                      Data
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold  text-white uppercase"
                  >
                    <div className="flex items-center">
                      <TagIcon className="h-3 w-3 mr-0.5" />
                      Categoria
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold  text-white uppercase"
                  >
                    <div className="flex items-center">
                      <DollarSign className="h-3 w-3 mr-0.5" />
                      Valor
                    </div>
                  </th>
                  <th scope="col">{""}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700  text-gray-400">
                {filteredTransactions.map((transactions) => (
                  <tr key={transactions.id} className="hover:bg-[#000000]">
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
                      {formatDate(transactions.date as string | Date)}
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
                        className={`${
                          transactions.type === TransactionType.INCOME
                            ? "text-primary-500"
                            : "text-red-500"
                        }`}
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
