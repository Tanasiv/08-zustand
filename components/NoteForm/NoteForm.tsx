import '../NoteForm/NoteForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../lib/api';
import type { NoteTag } from '../../types/note';

interface NoteFormProps {
  onClose: () => void;
}

interface FormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Min 3 chars')
    .max(50, 'Max 50 chars')
    .required('Required'),
  content: Yup.string().max(500, 'Max 500 chars'),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required('Required'),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  const initialValues: FormValues = {
    title: '',
    content: '',
    tag: 'Todo',
  };

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        mutation.mutate(values); 
        actions.resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label>Title</label>
            <Field name="title" type="text" />
            <ErrorMessage name="title" component="span" />
          </div>

          <div>
            <label>Content</label>
            <Field name="content" as="textarea" rows={5} />
            <ErrorMessage name="content" component="span" />
          </div>

          <div>
            <label>Tag</label>
            <Field name="tag" as="select">
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" />
          </div>

          <div>
            <button type="button" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" disabled={isSubmitting}>
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}