import axios from "axios";
import { Note, CreateNoteDto } from "@/types/note";

export interface NotesResponse {
  data: Note[];
  total: number;
}

const api = axios.create({
  baseURL: "https://69e60c73ce4e908a155edec4.mockapi.io/api/v1",
  headers: {
    "x-api-key": process.env.NEXT_PUBLIC_NOTEHUB_TOKEN,
  },
});

export const fetchNotes = async (
  search: string = "",
  page: number = 1,
  limit: number = 6,
): Promise<NotesResponse> => {
  const { data, headers } = await api.get<Note[]>("/notes", {
    params: {
      search: search || undefined,
      page,
      limit, // Використовуємо limit замість perPage
    },
  });

  return {
    data,
    total: parseInt(headers["x-total-count"] || "50"),
  };
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (note: CreateNoteDto): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};
