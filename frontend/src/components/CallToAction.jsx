export default function CallToAction() {
  return (
    <section className="flex flex-col gap-6 md:flex-row p-3 border border-sky-500 rounded-lg text-center items-center">
      <article className="flex-1 justify-center flex flex-col items-center gap-6">
        <h2 className="text-2xl font-semibold">
          Visit my GitHub and Medium pages.
        </h2>
        <p className="text-gray-600 my-2 dark:text-gray-400 max-w-6xl text-lg">
          I code daily and write an article every Friday. I haven&apos;t skipped
          a day of coding or a week of writing for a few years already.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mb-2">
          <a
            href="https://github.com/Dimterion"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md uppercase py-3 px-11 bg-gradient-to-l from-cyan-500 via-sky-500 to-blue-500 text-white font-bold hover:bg-gradient-to-r"
          >
            GitHub
          </a>
          <a
            href="https://medium.com/@dimterion"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md uppercase py-3 px-10 bg-gradient-to-l from-blue-500 via-sky-500 to-cyan-500 text-white font-bold hover:bg-gradient-to-r"
          >
            Medium
          </a>
        </div>
      </article>
      <img
        src="https://dimterion.github.io/assets/profile_picture.jpg"
        alt="Placeholder image."
        className="rounded-lg sm:max-w-[400px] sm:max-h-[400px] sm:object-cover"
      />
    </section>
  );
}
