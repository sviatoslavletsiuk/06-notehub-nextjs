export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string; // Обов'язкове поле за фідбеком ментора
}

export interface CreateNoteDto {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}
