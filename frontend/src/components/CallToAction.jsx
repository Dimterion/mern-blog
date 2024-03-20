export default function CallToAction() {
  return (
    <section className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-lg text-center">
      <article className="flex-1 justify-center flex flex-col items-center gap-4">
        <h2 className="text-2xl">Placeholder title.</h2>
        <p className="text-gray-500 my-2 dark:text-gray-400">
          Placeholder text.
        </p>
        <a
          href="http://dimterion.github.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md uppercase border-teal-500 border py-3 px-10 bg-gradient-to-l from-cyan-500 via-sky-500 to-blue-500 text-white font-bold hover:bg-gradient-to-r"
        >
          Personal Page
        </a>
      </article>
      <img
        src="https://raw.githubusercontent.com/Dimterion/MERN-stack/main/client/src/assets/images/overviewImg.jpg"
        alt="Placeholder image."
        className="rounded-lg m-7"
      />
    </section>
  );
}
