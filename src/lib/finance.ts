import type { Goal, Transaction, TransactionCategory } from "@/types";

export function getFinancialSummary(transactions: Transaction[], goals: Goal[] = []) {
  const now = new Date();
  const monthly = transactions.filter((transaction) => {
    const date = new Date(`${transaction.date}T12:00:00`);
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  });
  const income = monthly.filter((item) => item.type === "income").reduce((sum, item) => sum + Number(item.value), 0);
  const expenses = monthly.filter((item) => item.type === "expense").reduce((sum, item) => sum + Number(item.value), 0);
  const balance = income - expenses;
  const savingsRate = income > 0 ? Math.max(0, Math.min(100, (balance / income) * 100)) : 0;
  const activeGoals = goals.filter((goal) => goal.status === "active");
  const goalProgress = activeGoals.length
    ? activeGoals.reduce((sum, goal) => sum + Math.min(100, (Number(goal.current_value) / Number(goal.target_value)) * 100), 0) / activeGoals.length
    : 0;
  const organization = Math.min(100, monthly.length * 8);
  const score = Math.round(Math.max(0, Math.min(100, savingsRate * 0.55 + goalProgress * 0.25 + organization * 0.2)));
  return { income, expenses, balance, savings: balance, savingsRate, score, activeGoals };
}

export function getCategoryTotals(transactions: Transaction[]) {
  const totals = new Map<TransactionCategory, number>();
  transactions.filter((item) => item.type === "expense").forEach((item) => {
    totals.set(item.category, (totals.get(item.category) ?? 0) + Number(item.value));
  });
  return Array.from(totals, ([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
}
