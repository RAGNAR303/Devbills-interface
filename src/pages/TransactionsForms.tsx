import { useEffect, useId, useState, type ChangeEvent } from "react";
import { TransactionType } from "../types/transactions";
import { getCategories } from "../services/categoryService";
import type { Category } from "../types/category";
import Card from "../components/Card";
import TransactionTypeSelect from "../components/TransactionTypeSelect";
import Input from "../components/Input";
import { CalendarIcon, DollarSignIcon, SquarePen, TagIcon } from "lucide-react";
import Select from "../components/Select";

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
  const formID = useId();
  useEffect(() => {
    const fetchCategories = async (): Promise<void> => {
      const response = await getCategories(); // Indo na API para trazer as categorias
      setCategories(response);
    };
    fetchCategories();
  }, []);

  // Filtra o "type" de categoria que foi selecionada no botão, e trás a categorias relacinadas a ela
  const filteredCategories = categories.filter((category) => category.type === formaData.type);
  const handleSubmit = () => {};

  // Transforma a chave "name" em "value" para
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // Coloca o "type" de transação, se ela e "ENCOME" ou "EXPENSE" para fazer ativaçao e trazer as cadegorias relaciondas
  const handleTransactionType = (itemType: TransactionType): void => {
    setFormData((prev) => ({ ...prev, type: itemType }));
  };

  return (
    <div className="container-app py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl text-center mb-4 font-bold">Nova Transação</h1>
        <Card>
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
              label="Descrição"
              name="description"
              type="text"
              value={formaData.description}
              onChange={handleChange}
              placeholder="Ex: Supermecado, Salário, etc..."
              icon={<SquarePen className="h-4 w-4 " />}
              required
            />
            <Input
              label="Valor"
              name="amount"
              type="number"
              step="0.01"
              min="0.01"
              value={formaData.amount}
              onChange={handleChange}
              placeholder="R$ 0.00"
              icon={<DollarSignIcon className="h-4 w-4 " />}
              required
            />
            <Input
              label="Data"
              name="date"
              type="date"
              value={formaData.date}
              onChange={handleChange}
              placeholder="dd/mm/aaaa"
              icon={<CalendarIcon className="h-4 w-4 " />}
              required
            />

            <Select
              label="Categoria"
              name="categoriId"
              value={formaData.categoryId}
              onChange={handleChange}
              icon={<TagIcon className="w-4 h-4" />}
              required
              options={[
                { value: "", label: "Selecione uma Categorias" },
                ...filteredCategories.map((category) => ({
                  value: category.id,
                  label: category.name,
                })),
              ]}
            />
          </form>
        </Card>
      </div>
    </div>
  );
};

export default TransactionsForms;
