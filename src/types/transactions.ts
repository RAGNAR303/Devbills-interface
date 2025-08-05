import type { Date } from "firebase/ai";
import type { Category, CategorySummary } from "./category";

export enum TransactionType {
  EXPENSE = "expense",
  INCOME = "income",
}

// export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  categoryId: string;
  category: Category;
  date: string | Date;
  description: string;
  type: TransactionType;
  createdAt: string | Date;
  updatedAt: string | Date;
}
// DATA TRANSFER OBJECT -> OBJETO DE TRANSFERÊNCIA DE DADOS
export interface CreateTransactionDTO {
  description: string;
  amount: number;
  date: Date | string;
  categoryId: string;
  type: TransactionType;
}

export interface TransactionFilter {
  month: number;
  year: number;
  categoryId?: string;
  type?: TransactionType;
}

export interface TransactionSummary {
  totalExpenses: number;
  totalIncomes: number;
  balance: number;
  expensesByCategory: CategorySummary[];
}
export interface MonthlyItem {
  name: string;
  expenses: number;
  income: number;
}
