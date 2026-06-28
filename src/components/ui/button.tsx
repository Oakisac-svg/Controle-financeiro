"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva("inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition disabled:pointer-events-none disabled:opacity-50", { variants: { variant: { default: "bg-gold-400 text-black hover:bg-gold-300", destructive: "bg-red-600 text-white hover:bg-red-700", outline: "border border-zinc-200 bg-white hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800", secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-white", ghost: "hover:bg-zinc-100 dark:hover:bg-zinc-800", link: "text-gold-500 underline-offset-4 hover:underline" }, size: { default: "h-10 px-4 py-2", sm: "h-9 px-3 text-xs", lg: "h-11 px-8", icon: "size-10" } }, defaultVariants: { variant: "default", size: "default" } });

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { asChild?: boolean; }
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => { const Comp = asChild ? Slot : "button"; return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />; });
Button.displayName = "Button";
export { Button, buttonVariants };
