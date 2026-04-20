"use client";
import css from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  isLastPage: boolean;
}

export default function Pagination({
  currentPage,
  onPageChange,
  isLastPage,
}: PaginationProps) {
  return (
    <div className={css.container}>
      <button
        className={css.button}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <span className={css.info}>Page {currentPage}</span>

      <button
        className={css.button}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage}
      >
        Next
      </button>
    </div>
  );
}
