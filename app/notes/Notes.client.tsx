"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchNotes, deleteNote, createNote } from "@/lib/api/noteApi";
import NoteList from "@/components/NoteList/NoteList";
import NoteForm from "@/components/NoteForm/NoteForm";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
import css from "./Notes.client.module.css";

export default function NotesClient() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: notes = [] } = useQuery({
    queryKey: ["notes", search],
    queryFn: () => fetchNotes(search),
  });

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setIsModalOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });

  return (
    <div className={css.container}>
      <div className={css.actions}>
        <SearchBox value={search} onChange={setSearch} />
        <button onClick={() => setIsModalOpen(true)} className={css.addBtn}>
          Add Note
        </button>
      </div>

      <NoteList notes={notes} onDelete={(id) => deleteMutation.mutate(id)} />

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onSubmit={(data) => createMutation.mutate(data)}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
