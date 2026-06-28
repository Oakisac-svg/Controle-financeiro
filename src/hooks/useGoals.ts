"use client";

import { useCallback, useState } from "react";
import { useAuth } from "@/context/auth";
import { getSupabase } from "@/lib/supabase";
import type { Goal } from "@/types";

export type GoalInput = Omit<Goal, "id" | "user_id" | "created_at" | "updated_at">;

export function useGoals() {
  const { user } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGoals = useCallback(async (status?: Goal["status"]) => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      let query = getSupabase().from("goals").select("*").eq("user_id", user.id);
      if (status) query = query.eq("status", status);
      const { data, error: queryError } = await query.order("deadline", { ascending: true });
      if (queryError) throw queryError;
      setGoals((data ?? []) as Goal[]);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Não foi possível carregar as metas.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  const createGoal = useCallback(async (input: GoalInput) => {
    if (!user) throw new Error("Faça login para criar uma meta.");
    const { error: mutationError } = await getSupabase().from("goals").insert({ ...input, user_id: user.id });
    if (mutationError) throw mutationError;
    await fetchGoals();
  }, [user, fetchGoals]);

  const updateGoal = useCallback(async (id: string, input: Partial<GoalInput>) => {
    if (!user) throw new Error("Faça login para atualizar uma meta.");
    const { error: mutationError } = await getSupabase().from("goals").update(input).eq("id", id).eq("user_id", user.id);
    if (mutationError) throw mutationError;
    await fetchGoals();
  }, [user, fetchGoals]);

  const deleteGoal = useCallback(async (id: string) => {
    if (!user) throw new Error("Faça login para excluir uma meta.");
    const { error: mutationError } = await getSupabase().from("goals").delete().eq("id", id).eq("user_id", user.id);
    if (mutationError) throw mutationError;
    await fetchGoals();
  }, [user, fetchGoals]);

  return { goals, loading, error, fetchGoals, createGoal, updateGoal, deleteGoal };
}
