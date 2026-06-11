// "use client" garante que este arquivo seja executado no lado do cliente,
// o que é necessário para usar hooks do React e renderizar os Toasts (notificações) na tela.
"use client";

import { createContext, useContext, useMemo } from "react";
// Importa o objeto 'toast' da biblioteca 'sonner', que faz o trabalho pesado de exibir os alertas.
import { toast } from "sonner";

// Cria o contexto do Toast. O valor inicial é null.
const ToastContext = createContext(null);

// Componente Provedor (Provider) que vai envelopar a aplicação (ou parte dela)
// para disponibilizar as funções de notificação globalmente.
export function ToastContextProvider({ children }) {
  
  // useMemo é usado aqui para criar e memorizar as funções de toast apenas uma vez na montagem inicial.
  // Como o array de dependências está vazio ([]), este objeto não será recriado em novas renderizações,
  // mantendo a referência estável e otimizando a performance dos componentes que usam este contexto.
  const value = useMemo(() => {
    
    // Função para exibir uma notificação de sucesso
    function showSuccess(message, options = {}) {
      return toast.success(message, options);
    }

    // Função para exibir uma notificação de erro
    function showError(message, options = {}) {
      return toast.error(message, options);
    }

    // Função para exibir uma notificação de informação neutra
    function showInfo(message, options = {}) {
      return toast.info(message, options);
    }

    // Função para exibir uma notificação de alerta/aviso
    function showWarning(message, options = {}) {
      return toast.warning(message, options);
    }

    // Função para exibir uma notificação de carregamento (útil para processos demorados)
    function showLoading(message, options = {}) {
      return toast.loading(message, options);
    }

    // Função especial para lidar com Promises (operações assíncronas).
    // Ela muda o estado do toast automaticamente de "carregando" para "sucesso" ou "erro"
    // dependendo do resultado da Promise. Possui textos padrão de fallback (reserva).
    function showPromise(promise, messages) {
      return toast.promise(promise, {
        loading: messages?.loading || "Carregando...",
        success: messages?.success || "Concluído com sucesso!",
        error: messages?.error || "Algo deu errado.",
      });
    }

    // Função para remover/fechar um toast específico usando o seu ID
    function dismissToast(id) {
      toast.dismiss(id);
    }

    // Função para limpar todas as notificações que estão na tela de uma vez só
    function dismissAllToasts() {
      toast.dismiss();
    }

    // Retorna todas essas funções empacotadas no objeto que será distribuído pelo contexto
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
  }, []); // Array vazio garante que a memorização só aconteça uma vez

  // Retorna o Provider injetando o objeto 'value' para os componentes filhos
  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

// Hook customizado (Custom Hook) para ser chamado nos componentes 
// onde você precisar disparar um Toast. (ex: const { showSuccess } = useToast())
export function useToast() {
  const context = useContext(ToastContext);

  // Trava de segurança: avisa o desenvolvedor se ele tentar usar o hook
  // fora do englobamento do <ToastContextProvider>.
  if (!context) {
    throw new Error("useToast must be used inside ToastContextProvider");
  }

  // Devolve as funções de Toast prontas para uso
  return context;
}