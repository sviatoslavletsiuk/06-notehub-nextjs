"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api";
import { Note } from "@/types/note";
import Link from "next/link";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  if (notes.length === 0) return <p>No notes found.</p>;

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.item}>
          <Link href={`/notes/${note.id}`} className={css.link}>
            <h3>{note.title}</h3>
            <p className={css.content}>{note.content}</p>
            <span className={css.tag}>{note.tag}</span>{" "}
            {/* Тепер відображається */}
          </Link>
          <button
            className={css.deleteBtn}
            onClick={() => mutation.mutate(note.id)}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "..." : "Delete"}
          </button>
        </li>
      ))}
    </ul>
  );
}
