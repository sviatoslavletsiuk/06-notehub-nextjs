"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import { NoteTag } from "@/types/note";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  onCancel: () => void;
}

const NoteSchema = Yup.object().shape({
  title: Yup.string().min(3, "Too short").required("Required"),
  content: Yup.string().max(500, "Max 500 symbols"), // Необов'язкове за вимогою
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
      <Form className={css.form}>
        <div className={css.field}>
          <Field name="title" placeholder="Title" className={css.input} />
          <ErrorMessage name="title" component="div" className={css.error} />
        </div>

        <div className={css.field}>
          <Field
            name="content"
            as="textarea"
            placeholder="Content (optional)"
            className={css.textarea}
          />
          <ErrorMessage name="content" component="div" className={css.error} />
        </div>

        <Field name="tag" as="select" className={css.select}>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </Field>

        <div className={css.buttons}>
          <button type="submit" disabled={mutation.isPending}>
            Save
          </button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </Form>
    </Formik>
  );
}
