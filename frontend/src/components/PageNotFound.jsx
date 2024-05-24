import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <main className="text-center min-h-[70vh] flex flex-col justify-center gap-6">
      <h1 className="text-2xl font-semibold">Page not found.</h1>
      <Link className="mx-auto" to="/">
        <button className="font-bold border-2 border-sky-500 rounded-lg w-56 max-w-[200px] text-center py-2 bg-sky-500 text-white mx-auto hover:text-sky-500 hover:bg-white dark:hover:bg-transparent">
          Back to the Home page
        </button>
      </Link>
    </main>
  );
}
