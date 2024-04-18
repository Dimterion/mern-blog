import CallToAction from "../components/CallToAction";

export default function About() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-12 pb-10">
      <h1 className="text-3xl font-bold">About me</h1>
      <section className="p-3 bg-sky-100 dark:bg-slate-700 mb-7 max-w-[1000px] mx-auto rounded-md">
        <CallToAction />
      </section>
      <section className="flex flex-col gap-6 md:flex-row p-3 border border-sky-500 rounded-lg text-center items-center max-w-[90vw] bg-sky-50 dark:bg-gray-800">
        <article className="flex-1 justify-center flex flex-col items-center gap-6">
          <h2 className="text-2xl font-semibold">Contacts & Links</h2>
          <p className="text-gray-600 mb-2 dark:text-gray-400 max-w-6xl text-lg">
            Here are some of my other profiles:
          </p>
          <aside className="flex flex-wrap gap-4 justify-center mb-2">
            <a
              href="https://www.linkedin.com/in/dmitrii-p/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md uppercase py-3 px-11 bg-gradient-to-l from-cyan-500 via-sky-500 to-blue-500 text-white font-bold hover:bg-gradient-to-r"
            >
              LinkedIn
            </a>
            <a
              href="https://twitter.com/Dimterion"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md uppercase py-3 px-12 bg-gradient-to-l from-blue-500 via-sky-500 to-blue-500 text-white font-bold hover:bg-gradient-to-t"
            >
              Twitter
            </a>
            <a
              href="http://dimterion.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md uppercase py-3 px-10 bg-gradient-to-l from-blue-500 via-sky-500 to-cyan-500 text-white font-bold hover:bg-gradient-to-r"
            >
              Portfolio
            </a>
          </aside>
        </article>
      </section>
    </main>
  );
}
