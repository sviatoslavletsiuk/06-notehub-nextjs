import axios from "axios";
import { Note, CreateNoteDto, NotesResponse } from "@/types/note";

const api = axios.create({
  baseURL: "https://69e60c73ce4e908a155edec4.mockapi.io/api/v1", //
  headers: {
    "x-api-key": process.env.NEXT_PUBLIC_NOTEHUB_TOKEN,
  },
});

export const fetchNotes = async (
  search: string = "",
  page: number = 1,
  limit: number = 6,
): Promise<NotesResponse> => {
  // MockAPI повертає масив Note[]
  const response = await api.get<Note[]>("/notes", {
    params: {
      search: search || undefined,
      page,
      limit, //
    },
  });

  // MockAPI зазвичай не повертає загальну кількість сторінок у тілі.
  // Використовуємо заголовок або фіксоване число для демонстрації.
  const totalCount = Number(response.headers["x-total-count"] || 50);

  return {
    notes: response.data, // Тепер дані точно потраплять у компонент
    totalPages: Math.ceil(totalCount / limit),
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

// Обов'язково додаємо експорт, щоб прибрати помилку в NoteList
export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};
