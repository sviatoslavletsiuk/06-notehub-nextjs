"use client";
import { useEffect, ReactNode } from "react";
import css from "./Modal.module.css";

export default function Modal({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      className={css.backdrop}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={css.modal}>
        <button className={css.closeBtn} onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
