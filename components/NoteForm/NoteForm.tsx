"use client";
import { useState } from "react";
import { CreateNoteDto } from "@/types/note";
import css from "./NoteForm.module.css";

const TAGS = ["Work", "Personal", "Home", "Health", "Education", "Other"];

interface NoteFormProps {
  onSubmit: (data: CreateNoteDto) => void;
  onCancel: () => void;
}

export default function NoteForm({ onSubmit, onCancel }: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState(TAGS[0]);
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onSubmit({ title, tag, content });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h2 className={css.title}>Create New Note</h2>

      <div className={css.field}>
        <label className={css.label}>Title</label>
        <input
          type="text"
          className={css.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title..."
          required
        />
      </div>

      <div className={css.field}>
        <label className={css.label}>Tag</label>
        <select
          className={css.input}
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        >
          {TAGS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className={css.field}>
        <label className={css.label}>Content</label>
        <textarea
          className={css.textarea}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note here..."
          required
        />
      </div>

      <div className={css.buttons}>
        <button type="submit" className={css.submitBtn}>
          Save Note
        </button>
        <button type="button" onClick={onCancel} className={css.cancelBtn}>
          Cancel
        </button>
      </div>
    </form>
  );
}
