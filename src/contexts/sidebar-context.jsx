"use client";

import { createContext, useContext, useMemo, useState } from "react";

const SidebarContext = createContext(null);

export function SidebarContextProvider({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const value = useMemo(() => {
    function openSidebar() {
      setIsSidebarOpen(true);
    }

    function closeSidebar() {
      setIsSidebarOpen(false);
    }

    function toggleSidebar() {
      setIsSidebarOpen((current) => !current);
    }

    return {
      isSidebarOpen,
      openSidebar,
      closeSidebar,
      toggleSidebar,
    };
  }, [isSidebarOpen]);

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used inside SidebarContextProvider");
  }

  return context;
}