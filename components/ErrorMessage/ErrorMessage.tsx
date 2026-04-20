"use client";

import css from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  children: React.ReactNode;
}

export default function ErrorMessage({ children }: ErrorMessageProps) {
  return <div className={css.error}>{children}</div>;
}
