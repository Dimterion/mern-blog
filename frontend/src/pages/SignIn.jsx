import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Spinner } from "flowbite-react";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out all fields."));
    }

    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));

        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <main className="mt-20 min-h-screen">
      <section className="mx-auto flex max-w-3xl flex-col gap-5 p-3 md:flex-row md:items-center">
        <article className="flex-1">
          <Link to="/" className="text-3xl font-bold dark:text-white">
            <span className="rounded-lg bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 px-2 py-1 text-white">
              Dimterion&apos;s
            </span>
            <span>site</span>
          </Link>
          <p className="mt-5 text-sm">
            Sign in with your email and password or your Google account.
          </p>
        </article>
        <article className="flex-1">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label className="mb-1 whitespace-normal font-semibold">
              Email
            </label>
            <input
              type="email"
              placeholder="emailname@email.com"
              id="email"
              className="mb-4 rounded-lg border-gray-300 bg-gray-50 p-2 focus:border-sky-500 focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:focus:border-sky-500"
              onChange={handleChange}
            />
            <label className="mb-1 whitespace-normal font-semibold">
              Password
            </label>
            <input
              type="password"
              placeholder="**********"
              id="password"
              className="mb-4 rounded-lg border-gray-300 bg-gray-50 p-2 focus:border-sky-500 focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:focus:border-sky-500"
              onChange={handleChange}
            />
            <button
              className="mx-auto my-4 flex w-full justify-center rounded-lg border-2 border-sky-500 py-2 text-center text-sm font-bold text-sky-500 hover:bg-sky-500 hover:text-white"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <OAuth />
          <aside className="mt-5 flex gap-2 text-sm">
            <span>Don&apos;t have an account?</span>
            <Link to="/sign-up" className="text-sky-500 hover:underline">
              Sign Up
            </Link>
          </aside>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </article>
      </section>
    </main>
  );
}
