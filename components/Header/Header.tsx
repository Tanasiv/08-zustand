import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Link href="/">NoteHub</Link>

      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
             <Link href="/notes/filter/all">Notes</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}