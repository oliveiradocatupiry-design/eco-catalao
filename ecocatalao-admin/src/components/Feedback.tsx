import { useEffect, useRef, useState } from "react";
import { AlertCircle, Check, X } from "lucide-react";
import type { Status } from "../types/catalog";
export function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`status ${status}`}>
      <span aria-hidden="true">●</span>{" "}
      {status === "active" ? "Ativo" : "Inativo"}
    </span>
  );
}
export function ErrorMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="message error" role="alert">
      <AlertCircle size={20} aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}
export function SuccessMessage({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  return (
    <div className="message success" role="status">
      <Check size={20} aria-hidden="true" />
      <span>{message}</span>
      <button
        className="icon-button"
        aria-label="Fechar mensagem"
        onClick={onClose}
      >
        <X size={18} />
      </button>
    </div>
  );
}
export function ConfirmDialog({
  title,
  children,
  confirmLabel = "Excluir",
  onConfirm,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  confirmLabel?: string;
  onConfirm: () => Promise<void>;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const previous = document.activeElement;
    ref.current?.showModal();
    return () => {
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, []);
  async function confirm() {
    setBusy(true);
    try {
      await onConfirm();
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Não foi possível concluir.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <dialog
      ref={ref}
      className="confirm-dialog"
      aria-labelledby="confirm-title"
      onCancel={(e) => {
        e.preventDefault();
        if (!busy) onClose();
      }}
    >
      <div className="dialog-symbol">
        <AlertCircle />
      </div>
      <h2 id="confirm-title">{title}</h2>
      <div className="muted">{children}</div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="form-actions">
        <button
          autoFocus
          className="button secondary"
          disabled={busy}
          onClick={onClose}
        >
          Cancelar
        </button>
        <button
          className="button danger"
          disabled={busy}
          onClick={() => void confirm()}
        >
          {busy ? "Aguarde…" : confirmLabel}
        </button>
      </div>
    </dialog>
  );
}
