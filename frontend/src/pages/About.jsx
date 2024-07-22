import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 pb-10">
      <h1 className="mt-10 text-3xl font-bold text-gray-600 dark:text-gray-400">
        About me
      </h1>
      <h2 className="text-center text-xl text-gray-600 dark:text-gray-400">
        Web Developer | React.js | JavaScript | CSS | HTML | Tailwind CSS | Git
      </h2>
      <div className="flex gap-2 sm:gap-4">
        <Link
          to="/search"
          className="flex w-fit items-center gap-1 font-bold text-sky-500 hover:underline sm:text-lg"
        >
          View posts
        </Link>
        <span className="font-bold text-sky-500">|</span>
        <Link
          to="/projects"
          className="flex w-fit items-center gap-1 font-bold text-sky-500 hover:underline sm:text-lg"
        >
          View projects
        </Link>
      </div>
      <section className="mx-auto mb-7 max-w-[1000px] rounded-md bg-sky-100 p-3 dark:bg-slate-700">
        <CallToAction />
      </section>
      <section className="flex max-w-[90vw] flex-col items-center gap-6 rounded-lg border border-sky-500 bg-sky-50 p-3 text-center md:flex-row dark:bg-gray-800">
        <article className="flex flex-1 flex-col items-center justify-center gap-6">
          <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-400">
            Contacts & Links
          </h2>
          <p className="mb-2 max-w-6xl text-lg text-gray-600 dark:text-gray-400">
            Here are some of my other profiles:
          </p>
          <aside className="mb-2 flex flex-wrap justify-center gap-4">
            <a
              href="https://www.linkedin.com/in/dmitrii-p/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-gradient-to-l from-cyan-500 via-sky-500 to-blue-500 px-11 py-3 font-bold uppercase text-white hover:bg-gradient-to-r"
            >
              LinkedIn
            </a>
            <a
              href="https://twitter.com/Dimterion"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-gradient-to-l from-blue-500 via-sky-500 to-blue-500 px-12 py-3 font-bold uppercase text-white hover:bg-gradient-to-t"
            >
              Twitter
            </a>
            <a
              href="http://dimterion.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-gradient-to-l from-blue-500 via-sky-500 to-cyan-500 px-10 py-3 font-bold uppercase text-white hover:bg-gradient-to-r"
            >
              Portfolio
            </a>
          </aside>
        </article>
      </section>
    </main>
  );
}
