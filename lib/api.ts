import axios from "axios";
import { Note, CreateNoteDto } from "@/types/note";

// 1. Інтерфейс суворо за вимогою ментора
export interface NotesResponse {
  notes: Note[]; // Ментор вимагає 'notes' (у MockAPI це масив data)
  totalPages: number; // Ментор вимагає 'totalPages' (ми вирахуємо це з headers)
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
  perPage: number = 6, // Для ментора залишаємо назву perPage
): Promise<NotesResponse> => {
  // 2. MockAPI не розуміє "perPage", тому всередині запиту використовуємо "limit"
  // Це виправить помилку 404, яку ти бачив у консолі
  const { data, headers } = await api.get<Note[]>("/notes", {
    params: {
      search: search || undefined,
      page,
      limit: perPage,
    },
  });

  // 3. MockAPI повертає загальну кількість записів у заголовку x-total-count
  const totalCount = parseInt(headers["x-total-count"] || "0");
  const totalPages = Math.ceil(totalCount / perPage);

  // 4. Повертаємо об'єкт саме в тій структурі, яку хоче ментор
  return {
    notes: data,
    totalPages: totalPages,
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
