"use client";

import { useCallback, useState } from "react";
import { useAuth } from "@/context/auth";
import { getSupabase } from "@/lib/supabase";
import type { Transaction, TransactionCategory, TransactionType } from "@/types";

export type TransactionInput = Omit<
  Transaction,
  "id" | "user_id" | "created_at" | "updated_at"
>;

export function useTransactions() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async (filters?: {
    startDate?: string;
    endDate?: string;
    category?: TransactionCategory;
    type?: TransactionType;
  }) => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      let query = getSupabase()
        .from("transactions")
        .select("*")
        .eq("user_id", user.id);
      if (filters?.startDate) query = query.gte("date", filters.startDate);
      if (filters?.endDate) query = query.lte("date", filters.endDate);
      if (filters?.category) query = query.eq("category", filters.category);
      if (filters?.type) query = query.eq("type", filters.type);
      const { data, error: queryError } = await query.order("date", { ascending: false });
      if (queryError) throw queryError;
      setTransactions((data ?? []) as Transaction[]);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Não foi possível carregar os lançamentos.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  const createTransaction = useCallback(async (input: TransactionInput) => {
    if (!user) throw new Error("Faça login para criar um lançamento.");
    const { error: mutationError } = await getSupabase()
      .from("transactions")
      .insert({ ...input, user_id: user.id });
    if (mutationError) throw mutationError;
    await fetchTransactions();
  }, [user, fetchTransactions]);

  const updateTransaction = useCallback(async (id: string, input: Partial<TransactionInput>) => {
    if (!user) throw new Error("Faça login para editar um lançamento.");
    const { error: mutationError } = await getSupabase()
      .from("transactions")
      .update(input)
      .eq("id", id)
      .eq("user_id", user.id);
    if (mutationError) throw mutationError;
    await fetchTransactions();
  }, [user, fetchTransactions]);

  const deleteTransaction = useCallback(async (id: string) => {
    if (!user) throw new Error("Faça login para excluir um lançamento.");
    const { error: mutationError } = await getSupabase()
      .from("transactions")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);
    if (mutationError) throw mutationError;
    await fetchTransactions();
  }, [user, fetchTransactions]);

  return { transactions, loading, error, fetchTransactions, createTransaction, updateTransaction, deleteTransaction };
}
