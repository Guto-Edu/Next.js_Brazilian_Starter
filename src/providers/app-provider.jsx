"use client";

import { SidebarContextProvider } from "@/context/sidebar-context";
import { ToastContextProvider } from "@/context/toast-context";
import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";
import { ToastProvider } from "./toast-provider";

export function AppProvider({ children }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <ToastContextProvider>
          <SidebarContextProvider>
            {children}
            <ToastProvider />
          </SidebarContextProvider>
        </ToastContextProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}