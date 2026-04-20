import axios from "axios";
import { Note, CreateNoteDto } from "@/types/note";

const api = axios.create({
  // Оновлено згідно з твоїм скріншотом
  baseURL: "https://69e5c49fce4e908a155e61b0.mockapi.io/api/v1",
  headers: {
    "x-api-key": process.env.NEXT_PUBLIC_NOTEHUB_TOKEN,
  },
});

export const fetchNotes = async (search: string = ""): Promise<Note[]> => {
  const { data } = await api.get<Note[]>(`/notes`, {
    params: search ? { title: search } : {}, // MockAPI зазвичай шукає по полю title
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (note: CreateNoteDto): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", note);
  return data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`);
};
