import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "flex h-11 w-full rounded-xl border border-zinc-200 bg-white px-3.5 text-sm text-zinc-950 shadow-sm placeholder:text-zinc-400 hover:border-zinc-300 focus:border-gold-400 focus:ring-4 focus:ring-gold-400/10 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-600",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";
export { Input };
