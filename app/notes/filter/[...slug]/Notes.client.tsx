"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import Link from "next/link";

import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";

import css from "./Notes.module.css";

export default function NotesClient({ tag }: { tag: string }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");

  // debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const { data } = useQuery({
    queryKey: ["notes", page, debounced, tag],
    queryFn: () => fetchNotes(page, debounced, tag),
  });

  const notes = data?.notes ?? [];

  return (
    <div className={css.container}>
      <SearchBox
        value={search}
        onSearch={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />

      <Link href="/notes/action/create">
        <button>Create note +</button>
      </Link>

      {notes.length > 0 && <NoteList notes={notes} />}

      <Pagination
        currentPage={page}
        pageCount={data?.totalPages ?? 1}
        onPageChange={(p) => setPage(p)}
      />
    </div>
  );
}