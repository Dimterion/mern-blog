import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col justify-center gap-6 text-center">
      <h1 className="text-2xl font-semibold">Page not found.</h1>
      <Link className="mx-auto" to="/">
        <button className="mx-auto w-56 max-w-[200px] rounded-lg border-2 border-sky-500 bg-sky-500 py-2 text-center font-bold text-white hover:bg-white hover:text-sky-500 dark:hover:bg-transparent">
          Back to the Home page
        </button>
      </Link>
    </main>
  );
}
