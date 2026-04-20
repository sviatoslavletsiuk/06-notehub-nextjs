import Link from "next/link";
import { Note } from "@/types/note";
import css from "./NoteList.module.css";

interface Props {
  notes: Note[];
  onDelete: (id: string) => void;
}

export default function NoteList({ notes, onDelete }: Props) {
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.item}>
          <h3>{note.title}</h3>
          <p>{note.tag}</p>
          <div className={css.actions}>
            <Link href={`/notes/${note.id}`} className={css.link}>
              View details
            </Link>
            <button onClick={() => onDelete(note.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
