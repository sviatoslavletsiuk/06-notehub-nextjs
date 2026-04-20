"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import { NoteTag } from "@/types/note";
import css from "./NoteForm.module.css";

const NoteSchema = Yup.object().shape({
  title: Yup.string().min(3, "Занадто короткий!").required("Обов'язково"),
  content: Yup.string()
    .min(10, "Опишіть детальніше...")
    .required("Обов'язково"),
  tag: Yup.string().required("Оберіть тег"),
});

export default function NoteForm({ onCancel }: { onCancel: () => void }) {
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
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <Field name="title" placeholder="Заголовок" className={css.input} />
          <ErrorMessage name="title" component="div" className={css.error} />

          <Field
            name="content"
            as="textarea"
            placeholder="Текст нотатки"
            className={css.textarea}
          />
          <ErrorMessage name="content" component="div" className={css.error} />

          <Field name="tag" as="select" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>

          <div className={css.buttons}>
            <button type="submit" disabled={isSubmitting}>
              Зберегти
            </button>
            <button type="button" onClick={onCancel}>
              Скасувати
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
