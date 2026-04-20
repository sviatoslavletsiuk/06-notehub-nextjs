"use client";

import { Formik, Form, Field, ErrorMessage as FormikError } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import { NoteTag } from "@/types/note";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  onCancel: () => void;
}

const NoteSchema = Yup.object().shape({
  title: Yup.string().min(3, "Too short").required("Title is required"),
  content: Yup.string().max(500, "Content must be at most 500 characters"),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("Tag is required"),
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
        <div className={css.fieldWrapper}>
          <Field name="title" placeholder="Title" className={css.inputField} />
          <FormikError name="title">
            {(msg) => <ErrorMessage>{msg}</ErrorMessage>}
          </FormikError>
        </div>

        <div className={css.fieldWrapper}>
          <Field
            name="content"
            as="textarea"
            placeholder="Content (optional)"
            className={css.textareaField}
          />
          <FormikError name="content">
            {(msg) => <ErrorMessage>{msg}</ErrorMessage>}
          </FormikError>
        </div>

        <div className={css.fieldWrapper}>
          <Field name="tag" as="select" className={css.selectField}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <FormikError name="tag">
            {(msg) => <ErrorMessage>{msg}</ErrorMessage>}
          </FormikError>
        </div>

        <div className={css.formActions}>
          <button
            type="submit"
            className={css.submitBtn}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Creating..." : "Create note"}
          </button>
          <button type="button" className={css.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </Form>
    </Formik>
  );
}
