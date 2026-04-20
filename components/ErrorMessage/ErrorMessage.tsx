"use client";

import React from "react";
import css from "./ErrorMessage.module.css"; // Переконайся, що назва файлу збігається

interface ErrorMessageProps {
  children: React.ReactNode;
}

export default function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <div className={css.errorContainer} role="alert">
      {children}
    </div>
  );
}
