"use client";

import React from "react";

interface ErrorMessageProps {
  children: React.ReactNode;
}

export default function ErrorMessage({ children }: ErrorMessageProps) {
  return <div role="alert">{children}</div>;
}
