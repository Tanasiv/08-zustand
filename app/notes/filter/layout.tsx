export default function Layout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <section style={{ display: "flex" }}>
      <aside>{sidebar}</aside>
      <main>{children}</main>
    </section>
  );
}