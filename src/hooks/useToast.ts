"use client";

import * as React from "react";
import type { ToastActionElement } from "@/components/ui/toast";

type ToasterToast = { id: string; title?: React.ReactNode; description?: React.ReactNode; action?: ToastActionElement; open?: boolean; onOpenChange?: (open: boolean) => void; variant?: "default" | "destructive" | "success" };
type Action = { type: "ADD_TOAST"; toast: ToasterToast } | { type: "UPDATE_TOAST"; toast: Partial<ToasterToast> } | { type: "DISMISS_TOAST"; toastId?: string } | { type: "REMOVE_TOAST"; toastId?: string };
interface State { toasts: ToasterToast[] }
const listeners: Array<(state: State) => void> = [];
const timeouts = new Map<string, ReturnType<typeof setTimeout>>();
let memoryState: State = { toasts: [] };
let count = 0;

function reducer(state: State, action: Action): State {
  if (action.type === "ADD_TOAST") return { toasts: [action.toast] };
  if (action.type === "UPDATE_TOAST") return { toasts: state.toasts.map(item => item.id === action.toast.id ? { ...item, ...action.toast } : item) };
  if (action.type === "REMOVE_TOAST") return { toasts: action.toastId ? state.toasts.filter(item => item.id !== action.toastId) : [] };
  return { toasts: state.toasts.map(item => !action.toastId || item.id === action.toastId ? { ...item, open: false } : item) };
}
function dispatch(action: Action) { memoryState = reducer(memoryState, action); listeners.forEach(listener => listener(memoryState)); }
function queueRemoval(id: string) { if (timeouts.has(id)) return; timeouts.set(id, setTimeout(() => { timeouts.delete(id); dispatch({ type: "REMOVE_TOAST", toastId: id }); }, 5000)); }
type Toast = Omit<ToasterToast, "id">;
function toast(props: Toast) { const id = String(++count); const dismiss = () => { dispatch({ type: "DISMISS_TOAST", toastId: id }); queueRemoval(id); }; dispatch({ type: "ADD_TOAST", toast: { ...props, id, open: true, onOpenChange: open => { if (!open) dismiss(); } } }); queueRemoval(id); return { id, dismiss, update: (next: ToasterToast) => dispatch({ type: "UPDATE_TOAST", toast: { ...next, id } }) }; }
function useToast() { const [state, setState] = React.useState(memoryState); React.useEffect(() => { listeners.push(setState); return () => { const index = listeners.indexOf(setState); if (index >= 0) listeners.splice(index, 1); }; }, []); return { ...state, toast, dismiss: (id?: string) => dispatch({ type: "DISMISS_TOAST", toastId: id }) }; }
export { useToast, toast };
