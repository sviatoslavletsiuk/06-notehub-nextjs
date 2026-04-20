"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import { NoteTag } from "@/types/note";

interface NoteFormProps {
  onCancel: () => void;
}

const NoteSchema = Yup.object().shape({
  title: Yup.string().min(3, "Too short").required("Required"),
  content: Yup.string().max(500, "Too long"),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("Required"),
});

export default function NoteForm({ onCancel }: NoteFormProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onCancel();
    },
  });

  return (
    <Formik
      initialValues={{ title: "", content: "", tag: "Personal" as NoteTag }}
      validationSchema={NoteSchema}
      onSubmit={(values) => mutation.mutate(values)}
    >
      <Form>
        <Field name="title" placeholder="Title" />
        <ErrorMessage name="title" component="div" />

        <Field name="content" as="textarea" placeholder="Content (optional)" />
        <ErrorMessage name="content" component="div" />

        <Field name="tag" as="select">
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </Field>

        <button type="submit" disabled={mutation.isPending}>
          Save
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </Form>
    </Formik>
  );
}
