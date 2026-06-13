export default function Footer() {
  return (
    <footer>
      <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>

      <div>
        <p>Developer: Snizhana</p>
        <p>
          Contact: <a href="mailto:student@notehub.app">student@notehub.app</a>
        </p>
      </div>
    </footer>
  );
}