import axios from "axios";
import { Note, CreateNoteDto } from "@/types/note";

const api = axios.create({
  baseURL: "https://69e5c49fce4e908a155e61b0.mockapi.io/api/v1",
  headers: {
    "x-api-key": process.env.NEXT_PUBLIC_NOTEHUB_TOKEN,
  },
});

// 1. Отримання списку нотаток з пагінацією та пошуком
export const fetchNotes = async (
  search: string = "",
  page: number = 1,
  limit: number = 6,
): Promise<Note[]> => {
  const { data } = await api.get<Note[]>("/notes", {
    params: {
      search: search || undefined,
      page,
      limit,
    },
  });
  return data;
};

// 2. Отримання ОДНІЄЇ нотатки за ID (ЦЬОГО ФРАГМЕНТУ ВАМ НЕ ВИСТАЧАЛО)
export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

// 3. Створення нотатки
export const createNote = async (note: CreateNoteDto): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", note);
  return data;
};

// 4. Видалення нотатки
export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`);
};
