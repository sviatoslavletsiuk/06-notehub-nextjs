"use client";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <div className={css.container}>
      <label className={css.label} htmlFor="search">
        Find notes by keyword
      </label>
      <input
        id="search"
        type="text"
        className={css.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter search term..."
      />
    </div>
  );
}
