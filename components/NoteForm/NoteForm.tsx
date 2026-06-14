"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useNoteStore } from "@/lib/store/noteStore";

interface Props {
  onClose?: () => void;
}

export default function NoteForm({ onClose }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.push("/notes/filter/all");
    },
  });

  const handleChange = (field: string, value: string) => {
    setDraft({ [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(draft);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={draft.title}
        onChange={(e) => handleChange("title", e.target.value)}
        placeholder="Title"
      />

      <textarea
        value={draft.content}
        onChange={(e) => handleChange("content", e.target.value)}
        placeholder="Content"
      />

      <select
        value={draft.tag}
        onChange={(e) => handleChange("tag", e.target.value)}
      >
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Meeting">Meeting</option>
        <option value="Shopping">Shopping</option>
      </select>

      <button type="submit">Create</button>

      <button
        type="button"
        onClick={() => {
          if (onClose) {
            onClose();
          } else {
            router.back();
          }
        }}
      >
        Cancel
      </button>
    </form>
  );
}
