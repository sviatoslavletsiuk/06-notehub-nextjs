"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api";
import { Note } from "@/types/note";
import Link from "next/link";
import css from "./NoteList.module.css"; // Переконайся, що шлях правильний

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  // Додай цей рядок для перевірки в консолі браузера
  console.log("CSS Modules object:", css);

  const mutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <ul className={css.noteGrid}>
      {notes.map((note) => (
        <li key={note.id} className={css.noteCard}>
          <Link href={`/notes/${note.id}`} className={css.noteLink}>
            <h3 className={css.noteTitle}>{note.title}</h3>
            <p className={css.noteContent}>{note.content}</p>
            <span className={css.noteTag}>Tag: {note.tag}</span>
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
