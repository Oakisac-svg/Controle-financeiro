"use client";

import { useEffect, useMemo, useState } from "react";
import type { Habit, LifeTask, Meal } from "@/types";

const defaults = {
  habits: [
    { id: "h1", title: "Beber água", description: "Meta de 2 litros por dia", frequency: "Todos os dias", completed: true, streak: 8 },
    { id: "h2", title: "Treino", description: "Movimentar o corpo por 45 min", frequency: "5x por semana", completed: false, streak: 3 },
    { id: "h3", title: "Leitura", description: "Ler pelo menos 20 páginas", frequency: "Todos os dias", completed: true, streak: 12 },
  ] satisfies Habit[],
  tasks: [
    { id: "t1", title: "Revisar planejamento semanal", description: "Priorizar os três resultados da semana", status: "pending", priority: "high", dueDate: new Date().toISOString().slice(0, 10) },
    { id: "t2", title: "Organizar comprovantes", description: "Conferir lançamentos pendentes", status: "completed", priority: "medium", dueDate: new Date().toISOString().slice(0, 10) },
  ] satisfies LifeTask[],
  meals: [
    { id: "m1", name: "Café da manhã", calories: 420, proteins: 24, carbs: 48, fats: 14, mealTime: "08:10", notes: "Ovos, frutas e café" },
    { id: "m2", name: "Almoço", calories: 680, proteins: 42, carbs: 76, fats: 22, mealTime: "12:35", notes: "Arroz, feijão, frango e salada" },
  ] satisfies Meal[],
};

export function useLifeData() {
  const [habits, setHabits] = useState<Habit[]>(defaults.habits);
  const [tasks, setTasks] = useState<LifeTask[]>(defaults.tasks);
  const [meals, setMeals] = useState<Meal[]>(defaults.meals);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const saved = localStorage.getItem("finmb-life-data");
        if (saved) { const parsed = JSON.parse(saved); setHabits(parsed.habits ?? defaults.habits); setTasks(parsed.tasks ?? defaults.tasks); setMeals(parsed.meals ?? defaults.meals); }
      } catch { /* dados padrão mantidos */ }
      setReady(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  useEffect(() => { if (ready) localStorage.setItem("finmb-life-data", JSON.stringify({ habits, tasks, meals })); }, [habits, tasks, meals, ready]);
  const metrics = useMemo(() => {
    const completedHabits = habits.filter(h => h.completed).length;
    const completedTasks = tasks.filter(t => t.status === "completed").length;
    const routine = Math.round(((completedHabits / Math.max(habits.length, 1)) * .6 + (completedTasks / Math.max(tasks.length, 1)) * .4) * 100);
    const nutrition = Math.min(100, meals.length * 25);
    return { completedHabits, completedTasks, routine, nutrition, calories: meals.reduce((s, m) => s + m.calories, 0), proteins: meals.reduce((s,m)=>s+m.proteins,0), carbs: meals.reduce((s,m)=>s+m.carbs,0), fats: meals.reduce((s,m)=>s+m.fats,0) };
  }, [habits, tasks, meals]);
  return {
    habits, tasks, meals, metrics, ready,
    toggleHabit: (id: string) => setHabits(items => items.map(h => h.id === id ? { ...h, completed: !h.completed, streak: h.completed ? Math.max(0,h.streak-1) : h.streak+1 } : h)),
    addHabit: (habit: Omit<Habit, "id" | "completed" | "streak">) => setHabits(items => [{ ...habit, id: crypto.randomUUID(), completed: false, streak: 0 }, ...items]),
    deleteHabit: (id: string) => setHabits(items => items.filter(h => h.id !== id)),
    toggleTask: (id: string) => setTasks(items => items.map(t => t.id === id ? { ...t, status: t.status === "completed" ? "pending" : "completed" } : t)),
    addTask: (task: Omit<LifeTask, "id" | "status">) => setTasks(items => [{ ...task, id: crypto.randomUUID(), status: "pending" }, ...items]),
    deleteTask: (id: string) => setTasks(items => items.filter(t => t.id !== id)),
    addMeal: (meal: Omit<Meal, "id">) => setMeals(items => [{ ...meal, id: crypto.randomUUID() }, ...items]),
    deleteMeal: (id: string) => setMeals(items => items.filter(m => m.id !== id)),
  };
}
