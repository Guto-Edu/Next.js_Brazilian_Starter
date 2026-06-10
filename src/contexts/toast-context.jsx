"use client";

import { createContext, useContext, useMemo } from "react";
import { toast } from "sonner";

const ToastContext = createContext(null);

export function ToastContextProvider({ children }) {
  const value = useMemo(() => {
    function showSuccess(message, options = {}) {
      return toast.success(message, options);
    }

    function showError(message, options = {}) {
      return toast.error(message, options);
    }

    function showInfo(message, options = {}) {
      return toast.info(message, options);
    }

    function showWarning(message, options = {}) {
      return toast.warning(message, options);
    }

    function showLoading(message, options = {}) {
      return toast.loading(message, options);
    }

    function showPromise(promise, messages) {
      return toast.promise(promise, {
        loading: messages?.loading || "Carregando...",
        success: messages?.success || "Concluído com sucesso!",
        error: messages?.error || "Algo deu errado.",
      });
    }

    function dismissToast(id) {
      toast.dismiss(id);
    }

    function dismissAllToasts() {
      toast.dismiss();
    }

    return {
      showSuccess,
      showError,
      showInfo,
      showWarning,
      showLoading,
      showPromise,
      dismissToast,
      dismissAllToasts,
    };
  }, []);

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastContextProvider");
  }

  return context;
}