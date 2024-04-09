import CallToAction from "../components/CallToAction";

export default function About() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <section className="max-w-2xl mx-auto mb-8 p-3 text-center">
        <article>
          <h1 className="text-3xl font-semibold text-center my-7">
            About Dimterion&apos;s Blog
          </h1>
          <section className="text-gray-500 dark:text-gray-400 flex flex-col gap-6">
            <p>Information about the blog.</p>
            <p>Additional information about the blog.</p>
            <p>More information about the blog.</p>
          </section>
        </article>
      </section>
      <CallToAction />
    </main>
  );
}
