import css from "./page.module.css";

export default function Home() {
  return (
    <main className={css.main}>
      <section className={css.hero}>
        <h1>Welcome to NoteHub</h1>
        <p>Your ultimate workspace for organized thoughts and projects.</p>
      </section>
    </main>
  );
}
