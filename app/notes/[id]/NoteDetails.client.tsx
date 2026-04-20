"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api"; // ВИПРАВЛЕНО ШЛЯХ
import css from "./NoteDetails.module.css";

export default function NoteDetailsClient() {
  const { id } = useParams();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id as string),
    enabled: !!id,
    refetchOnMount: false, // Вимога ментора
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !note) return <p>Note not found.</p>;

  return (
    <article className={css.container}>
      <header>
        <span className={css.tag}>{note.tag}</span>
        <h1>{note.title}</h1>
      </header>
      <div className={css.content}>
        <p>{note.content}</p>
      </div>
      <footer className={css.meta}>
        <small>Updated: {new Date(note.updatedAt).toLocaleString()}</small>
      </footer>
    </article>
  );
}
