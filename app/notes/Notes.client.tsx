"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchNotes, deleteNote, createNote } from "@/lib/api";
import { Note, CreateNoteDto } from "@/types/note";

import NoteList from "@/components/NoteList/NoteList";
import NoteForm from "@/components/NoteForm/NoteForm";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
import Pagination from "@/components/Pagination/Pagination";
import css from "./Notes.client.module.css";

export default function NotesClient() {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1); // Стан для поточної сторінки
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const LIMIT = 6; // Кількість нотаток на сторінці

  // Запит тепер залежить і від пошуку, і від сторінки
  const { data: notes = [], isLoading } = useQuery<Note[]>({
    queryKey: ["notes", search, page],
    queryFn: () => fetchNotes(search, page, LIMIT),
  });

  const createMutation = useMutation({
    mutationFn: (newNote: CreateNoteDto) => createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setIsModalOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });

  // При пошуку повертаємося на 1 сторінку
  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className={css.container}>
      <div className={css.actions}>
        <SearchBox value={search} onChange={handleSearch} />
        <button onClick={() => setIsModalOpen(true)} className={css.addBtn}>
          Add Note
        </button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <NoteList notes={notes} onDelete={(id) => deleteMutation.mutate(id)} />
      )}

      {/* Передаємо пропси в пагінацію */}
      <Pagination
        currentPage={page}
        onPageChange={(newPage) => setPage(newPage)}
        // Якщо нотаток менше ніж ліміт, то це остання сторінка (спрощена логіка для MockAPI)
        isLastPage={notes.length < LIMIT}
      />

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
