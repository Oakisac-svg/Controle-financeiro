export interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  monthly_income: number;
  has_debts: boolean;
  has_emergency_fund: boolean;
  main_goal: string | null;
  target_savings: number;
  financial_score: number;
  level: "bronze" | "silver" | "gold" | "diamond";
  avatar_url: string | null;
  theme: "light" | "dark" | "system";
  created_at: string;
  updated_at: string;
}

export type TransactionType = "income" | "expense";
export type TransactionCategory = "food" | "transport" | "housing" | "health" | "entertainment" | "education" | "shopping" | "subscriptions" | "investments" | "other";

export interface Transaction {
  id: string;
  user_id: string;
  name: string;
  value: number;
  category: TransactionCategory;
  type: TransactionType;
  date: string;
  observation: string | null;
  is_recurring: boolean;
  recurring_frequency: "daily" | "weekly" | "monthly" | "yearly" | null;
  created_at: string;
  updated_at: string;
}

export interface Goal {
  id: string;
  user_id: string;
  name: string;
  target_value: number;
  current_value: number;
  deadline: string;
  category: string | null;
  priority: "low" | "medium" | "high";
  description: string | null;
  status: "active" | "completed" | "abandoned";
  created_at: string;
  updated_at: string;
}
