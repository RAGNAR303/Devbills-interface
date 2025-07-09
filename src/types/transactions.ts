// export enum TransactionType {
//     EXPENSE = 'expense',
//     INCOME = 'income'
// }

import type { Category, CategorySummary } from "./category";

export type TransactionType = "income" | "expense";

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
