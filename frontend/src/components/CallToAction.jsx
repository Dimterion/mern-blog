export default function CallToAction() {
  return (
    <section className="flex flex-col items-center gap-6 rounded-lg border border-sky-500 p-3 text-center sm:flex-row">
      <article className="flex flex-1 flex-col items-center justify-center gap-6">
        <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-400">
          Visit my GitHub and Medium pages.
        </h2>
        <p className="my-2 max-w-6xl text-lg text-gray-600 dark:text-gray-400">
          I code daily and write an article every Friday. I haven&apos;t skipped
          a day of coding or a week of writing for a few years already.
        </p>
        <aside className="mb-2 flex flex-wrap justify-center gap-4">
          <a
            href="https://github.com/Dimterion"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-gradient-to-l from-cyan-500 via-sky-500 to-blue-500 px-11 py-3 font-bold uppercase text-gray-200 shadow-lg hover:bg-gradient-to-r"
          >
            GitHub
          </a>
          <a
            href="https://medium.com/@dimterion"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-gradient-to-l from-blue-500 via-sky-500 to-cyan-500 px-10 py-3 font-bold uppercase text-gray-200 shadow-lg hover:bg-gradient-to-r"
          >
            Medium
          </a>
        </aside>
      </article>
      <img
        src="https://dimterion.github.io/assets/profile_picture.jpg"
        alt="Placeholder image."
        className="h-[200px] max-h-[60vh] w-[200px] max-w-[95vw] rounded-lg border border-sky-500 sm:object-cover"
      />
    </section>
  );
}
