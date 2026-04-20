"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api";
import { Note } from "@/types/note";
import Link from "next/link";
import css from "./NoteList.module.css";

export default function NoteList({ notes }: { notes: Note[] }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  if (!notes || notes.length === 0) return <p>No notes found.</p>;

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.item}>
          <Link href={`/notes/${note.id}`} className={css.link}>
            <h3>{note.title || "Untitled"}</h3>
            <p className={css.content}>{note.content}</p>
          </Link>
          <button
            onClick={() => mutation.mutate(note.id)}
            disabled={mutation.isPending}
            className={css.deleteBtn}
          >
            {mutation.isPending ? "Deleting..." : "Delete"}
          </button>
        </li>
      ))}
    </ul>
  );
}
