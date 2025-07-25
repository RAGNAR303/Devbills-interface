import type {
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

  const zzz = response.data;
  console.log(zzz);
  return zzz;
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
        months
       },
  });

  return response.data;
};


export const deleteTransactions = async (id: string): Promise<void> => {
  await api.delete(`/transactions/${id}`)
}