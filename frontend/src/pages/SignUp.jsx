import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Spinner } from "flowbite-react";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      setLoading(false);

      if (data.success === false) {
        if (data.message.includes("duplicate key")) {
          return setErrorMessage(
            "Account with this username or email already exists.",
          );
        }

        return setErrorMessage(data.message);
      }

      setLoading(false);

      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(errorMessage);
      setLoading(false);
    }
  };

  return (
    <main className="my-20 min-h-screen">
      <section className="mx-auto flex max-w-3xl flex-col gap-5 p-3 md:flex-row md:items-center">
        <article className="flex-1">
          <Link to="/" className="text-3xl font-bold dark:text-gray-100">
            <span className="rounded-lg bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 px-2 py-1 text-gray-100">
              Dimterion&apos;s
            </span>
            <span>site</span>
          </Link>
          <p className="mt-5 text-sm">
            Sign up with your email and password or your Google account.*
          </p>
          <aside className="mt-8 text-xs">
            *Please note that the site is in Work In Progress state which means
            that it may change in the future and any saved data may be deleted
            from it.
          </aside>
        </article>
        <article className="relative flex-1">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label className="mb-1 whitespace-normal font-semibold">
              Username
            </label>
            <input
              type="text"
              placeholder="Name"
              id="username"
              className="mb-4 rounded-lg border-gray-300 bg-gray-50 p-2 shadow-lg focus:border-sky-500 focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:focus:border-sky-500"
              onChange={handleChange}
            />
            <label className="mb-1 whitespace-normal font-semibold">
              Email
            </label>
            <input
              type="email"
              placeholder="emailname@email.com"
              id="email"
              className="mb-4 rounded-lg border-gray-300 bg-gray-50 p-2 shadow-lg focus:border-sky-500 focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:focus:border-sky-500"
              onChange={handleChange}
            />
            <label className="mb-1 whitespace-normal font-semibold">
              Password
            </label>
            <input
              type="password"
              placeholder="**********"
              id="password"
              className="mb-4 rounded-lg border-gray-300 bg-gray-50 p-2 shadow-lg focus:border-sky-500 focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:focus:border-sky-500"
              onChange={handleChange}
            />
            <button
              className="mx-auto my-4 flex w-full items-center justify-center rounded-lg border-2 border-sky-500 py-2 text-center text-sm font-bold text-sky-500 shadow-lg hover:bg-sky-500 hover:text-gray-200"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" className="fill-sky-500 text-gray-300" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
          <OAuth />
          <aside className="mt-5 flex gap-2 text-sm">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-sky-500 hover:underline">
              Sign In
            </Link>
          </aside>
          {errorMessage && (
            <Alert
              className="absolute left-1/2 mt-5 w-[370px] max-w-[95vw] -translate-x-1/2 p-3"
              color="failure"
            >
              {errorMessage}
            </Alert>
          )}
        </article>
      </section>
    </main>
  );
}
