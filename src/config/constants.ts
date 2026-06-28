import type { TransactionCategory } from "@/types";

export const TRANSACTION_CATEGORIES: Record<TransactionCategory, { label: string; color: string }> = {
  food: { label: "Alimentação", color: "#ef6a6a" },
  transport: { label: "Transporte", color: "#45b7b0" },
  housing: { label: "Moradia", color: "#4b91c9" },
  health: { label: "Saúde", color: "#f18d69" },
  entertainment: { label: "Lazer", color: "#d9b72d" },
  education: { label: "Educação", color: "#63a56d" },
  shopping: { label: "Compras", color: "#d96798" },
  subscriptions: { label: "Assinaturas", color: "#6ba98f" },
  investments: { label: "Investimentos", color: "#9270c7" },
  other: { label: "Outros", color: "#8a8a85" },
};
