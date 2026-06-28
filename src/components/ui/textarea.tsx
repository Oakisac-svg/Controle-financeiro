import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn("min-h-24 w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-3 text-sm shadow-sm placeholder:text-zinc-400 focus:border-gold-400 focus:ring-4 focus:ring-gold-400/10 disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50", className)} {...props} />
));
Textarea.displayName = "Textarea";
export { Textarea };
