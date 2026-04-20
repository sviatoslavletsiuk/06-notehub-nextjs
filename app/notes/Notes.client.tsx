"use client";

import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import NoteForm from "@/components/NoteForm/NoteForm";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
import Pagination from "@/components/Pagination/Pagination";
import css from "./Notes.client.module.css";

export default function NotesClient() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedHandler = useMemo(
    () =>
      debounce((val: string) => {
        setDebouncedSearch(val);
        setPage(1);
      }, 500),
    [],
  );

  useEffect(() => {
    return () => debouncedHandler.cancel();
  }, [debouncedHandler]);

  const { data, isLoading } = useQuery({
    queryKey: ["notes", debouncedSearch, page],
    queryFn: () => fetchNotes(debouncedSearch, page, 6),
    placeholderData: (previousData) => previousData, // Виправлено для пагінації
  });

  return (
    <main className={css.container}>
      <section className={css.actions}>
        <SearchBox
          value={search}
          onChange={(v) => {
            setSearch(v);
            debouncedHandler(v);
          }}
        />
        <button onClick={() => setIsModalOpen(true)} className={css.addBtn}>
          Add Note
        </button>
      </section>

      {isLoading && !data ? (
        <p>Loading...</p>
      ) : (
        <NoteList notes={data?.notes || []} />
      )}

      <Pagination
        pageCount={data?.totalPages || 1}
        forcePage={page - 1}
        onPageChange={({ selected }) => setPage(selected + 1)}
      />

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </main>
  );
}
