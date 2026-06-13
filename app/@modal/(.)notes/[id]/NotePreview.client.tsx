"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";

import Modal from "@/components/Modal/Modal";

interface Props {
  id: string;
}

export default function NotePreviewClient({ id }: Props) {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => router.back();

  if (isLoading) {
    return (
      <Modal onClose={handleClose}>
        <p>Loading...</p>
      </Modal>
    );
  }

  if (isError || !data) {
    return (
      <Modal onClose={handleClose}>
        <p>Error loading note</p>
      </Modal>
    );
  }

  return (
    <Modal onClose={handleClose}>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
      <p>{data.tag}</p>

      <button onClick={handleClose}>Close</button>
    </Modal>
  );
}