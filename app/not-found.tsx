import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page not found | NoteHub",
  description: "The page you are looking for does not exist.",
  openGraph: {
    title: "404 - Page not found | NoteHub",
    description: "The page you are looking for does not exist.",
    url: "https://notehub.com/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <main style={{ padding: "40px", textAlign: "center" }}>
      <h1>404</h1>
      <p>Page not found</p>
    </main>
  );
}