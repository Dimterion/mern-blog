export default function CallToAction() {
  return (
    <section className="flex flex-col gap-6 md:flex-row p-3 border border-sky-500 rounded-lg text-center items-center">
      <article className="flex-1 justify-center flex flex-col items-center gap-6">
        <h2 className="text-2xl">Some title placeholder here.</h2>
        <p className="text-gray-500 my-2 dark:text-gray-400 max-w-6xl text-start">
          Some text placeholder here.
        </p>
        <a
          href="http://dimterion.github.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md uppercase py-3 px-10 bg-gradient-to-l from-cyan-500 via-sky-500 to-blue-500 text-white font-bold hover:bg-gradient-to-r"
        >
          Personal Page
        </a>
      </article>
      <img
        src="https://raw.githubusercontent.com/Dimterion/MERN-stack/main/client/src/assets/images/overviewImg.jpg"
        alt="Placeholder image."
        className="rounded-lg sm:max-w-[400px] sm:max-h-[400px] sm:object-cover"
      />
    </section>
  );
}
