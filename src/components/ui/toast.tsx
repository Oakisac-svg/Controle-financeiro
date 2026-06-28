"use client";

import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const ToastProvider = ToastPrimitives.Provider;
const ToastViewport = React.forwardRef<React.ElementRef<typeof ToastPrimitives.Viewport>, React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>>(({ className, ...props }, ref) => <ToastPrimitives.Viewport ref={ref} className={cn("fixed right-0 top-0 z-[100] flex max-h-screen w-full flex-col gap-2 p-4 sm:bottom-0 sm:top-auto sm:max-w-md", className)} {...props} />);
ToastViewport.displayName = "ToastViewport";

type ToastProps = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & { variant?: "default" | "destructive" | "success" };
const Toast = React.forwardRef<React.ElementRef<typeof ToastPrimitives.Root>, ToastProps>(({ className, variant = "default", ...props }, ref) => <ToastPrimitives.Root ref={ref} className={cn("group pointer-events-auto relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-2xl border bg-white p-4 pr-9 text-zinc-950 shadow-soft data-[state=closed]:opacity-0 dark:bg-zinc-900 dark:text-white", variant === "destructive" && "border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950", variant === "success" && "border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950", className)} {...props} />);
Toast.displayName = "Toast";
const ToastAction = ToastPrimitives.Action;
const ToastClose = React.forwardRef<React.ElementRef<typeof ToastPrimitives.Close>, React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>>((props, ref) => <ToastPrimitives.Close ref={ref} className="absolute right-3 top-3 rounded-md p-1 opacity-60 hover:opacity-100" {...props}><X className="size-4" /></ToastPrimitives.Close>);
ToastClose.displayName = "ToastClose";
const ToastTitle = ToastPrimitives.Title;
const ToastDescription = ToastPrimitives.Description;
type ToastActionElement = React.ReactElement<React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>>;
export { type ToastActionElement, Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport };
