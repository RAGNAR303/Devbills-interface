import {
  useEffect,
  useId,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import {
  TransactionType,
  type CreateTransactionDTO,
} from "../types/transactions";
import { getCategories } from "../services/categoryService";
import type { Category } from "../types/category";
import Card from "../components/Card";
import TransactionTypeSelect from "../components/TransactionTypeSelect";
import Input from "../components/Input";
import {
  AlertCircle,
  CalendarIcon,
  DollarSignIcon,
  LoaderCircle,
  Save,
  SquarePen,
  TagIcon,
} from "lucide-react";
import Select from "../components/Select";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { createTransaction } from "../services/transactionService";
import { toast } from "react-toastify";

interface FormData {
  description: string;
  amount: number;
  date: string;
  categoryId: string;
  type: TransactionType;
}

const initialFormData = {
  description: "",
  amount: 0,
  date: "",
  categoryId: "",
  type: TransactionType.EXPENSE,
};

const TransactionsForms = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formaData, setFormData] = useState<FormData>(initialFormData);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const formID = useId();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async (): Promise<void> => {
      const response = await getCategories(); // Indo na API para trazer as categorias
      setCategories(response);
    };
    fetchCategories();
  }, []);

  // Filtra o "type" de categoria que foi selecionada no botão, e trás a categorias relacinadas a ela
  const filteredCategories = categories.filter(
    (category) => category.type === formaData.type
  );

  const validateForm = (): boolean => {
    if (
      !formaData.amount ||
      !formaData.categoryId ||
      !formaData.date ||
      !formaData.description
    ) {
      setError("Preecha todos os campos");
      return false;
    }
    if (formaData.amount <= 0) {
      setError("O Valor deve ser mairo que zero");
      return false;
    }
    return true;
  };

  // Coloca o "type" de transação, se ela e "ENCOME" ou "EXPENSE" para fazer ativaçao e trazer as cadegorias relaciondas
  const handleTransactionType = (itemType: TransactionType): void => {
    setFormData((prev) => ({ ...prev, type: itemType }));
  };
  // Transforma a chave "name" em "value" para
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    // Previnir que a tela não recarrege  quanto dar submit
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (!validateForm()) {
        return;
      }
      const transactionData: CreateTransactionDTO = {
        description: formaData.description,
        amount: formaData.amount,
        categoryId: formaData.categoryId,
        date: `${formaData.date}T12:00:00.000Z`,
        type: formaData.type,
      };

      await createTransaction(transactionData);
      toast.success("Transação adicionada com sucesso!");
      navigate("/transacoes");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Falha ao adcionar Transação");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/transacoes");
  };

  return (
    <div className="container-app py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl text-center mb-4 font-bold">Nova Transação</h1>
        <Card>
          {error && (
            <div className="flex items-center bg-red-300 border border-red-700 rounded-xl p-4 mb-6">
              <AlertCircle className="w-5 h-5 text-red-700 mr-0.5" />
              <p className="text-red-700">{error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor={formID}> </label>
              <TransactionTypeSelect
                // Botão de escolher o tipo de transação
                id={formID}
                value={formaData.type}
                onChange={handleTransactionType}
              />
            </div>
            <Input
              label="Descrição:"
              name="description"
              type="text"
              value={formaData.description}
              onChange={handleChange}
              placeholder="Ex: Supermecado, Salário, etc..."
              icon={<SquarePen className="h-4 w-4 " />}
            />
            <Input
              label="Valor:"
              name="amount"
              type="number"
              step="0.01"
              value={formaData.amount}
              onChange={handleChange}
              placeholder="R$ 0.00"
              icon={<DollarSignIcon className="h-4 w-4 " />}
              required
            />
            <Input
              label="Data:"
              name="date"
              type="date"
              value={formaData.date}
              onChange={handleChange}
              placeholder="dd/mm/aaaa"
              icon={<CalendarIcon className="h-4 w-4 " />}
            />

            <Select
              label="Categoria:"
              name="categoryId"
              value={formaData.categoryId}
              onChange={handleChange}
              icon={<TagIcon className="w-4 h-4" />}
              options={[
                { value: "", label: "Selecione uma Categorias" },
                ...filteredCategories.map((category) => ({
                  value: category.id,
                  label: category.name,
                })),
              ]}
            />

            <div className="flex justify-end space-x-3 mt-3 ">
              <Button
                type="button"
                onClick={handleCancel}
                variant="outline"
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit}
                variant={
                  formaData.type === TransactionType.INCOME
                    ? "primary"
                    : "danger"
                }
                disabled={loading}
              >
                <div>
                  {loading ? (
                    <LoaderCircle className="w-4 h-4 mr-0.5 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-0.5" />
                  )}
                </div>
                Salvar
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default TransactionsForms;
