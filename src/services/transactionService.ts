import type {
  CreateTransactionDTO,
  MonthlyItem,
  Transaction,
  TransactionFilter,
  TransactionSummary,
} from "../types/transactions";
import { api } from "./api";

export const getTransactions = async (
  filter?: Partial<TransactionFilter>,
): Promise<Transaction[]> => {
  const response = await api.get<Transaction[]>("/transactions", {
    params: filter,
  });

  const responseData = response.data;

  return responseData;
};

export const getTransactionsSummary = async (
  month: number,
  year: number,
): Promise<TransactionSummary> => {
  const response = await api.get<TransactionSummary>("/transactions/summary", {
    params: { month, year },
  });
  return response.data;
};

export const getTransactionsMontly = async (
  month: number,
  year: number,
  months?: number,
): Promise<{ history: MonthlyItem[] }> => {
  const response = await api.get<{ history: MonthlyItem[] }>("/transactions/historical", {
    params: {
      month,
      year,
      months,
    },
  });

  return response.data;
};

// Deletando Transaction na API
export const deleteTransactions = async (id: string): Promise<void> => {
  await api.delete(`/transactions/${id}`);
};

// Mandado a Transaction criada para API
export const createTransaction = async (
  transactionData: CreateTransactionDTO,
): Promise<Transaction> => {
  const response = await api.post<Transaction>("/transactions", transactionData);

  return response.data;
};
