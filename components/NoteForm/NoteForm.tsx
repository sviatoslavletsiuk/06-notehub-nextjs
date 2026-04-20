"use client";

import { Formik, Form, Field, ErrorMessage as FormikError } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import { NoteTag } from "@/types/note";
import MyCustomError from "@/components/ErrorMessage/ErrorMessage";
import css from "./NoteForm.module.css";

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
      <Form className={css.form}>
        <div className={css.field}>
          <Field name="title" placeholder="Title" className={css.input} />
          {/* Використовуємо кастомний компонент помилки */}
          <FormikError name="title">
            {(msg) => <MyCustomError>{msg}</MyCustomError>}
          </FormikError>
        </div>

        <div className={css.field}>
          <Field
            name="content"
            as="textarea"
            placeholder="Content (optional)"
            className={css.textarea}
          />
          <FormikError name="content">
            {(msg) => <MyCustomError>{msg}</MyCustomError>}
          </FormikError>
        </div>

        <Field name="tag" as="select" className={css.select}>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </Field>

        <div className={css.buttons}>
          {/* Пункт 2 зауважень: правильний текст на кнопці */}
          <button
            type="submit"
            className={css.submitBtn}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Creating..." : "Create note"}
          </button>
          <button type="button" onClick={onCancel} className={css.cancelBtn}>
            Cancel
          </button>
        </div>
      </Form>
    </Formik>
  );
}
