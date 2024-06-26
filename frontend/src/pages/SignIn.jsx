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
    <main className="min-h-screen mt-20">
      <section className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <article className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-3xl">
            <span className="px-2 py-1 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 rounded-lg text-white">
              Dimterion&apos;s
            </span>
            <span>site</span>
          </Link>
          <p className="text-sm mt-5">
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
              className="mb-4 p-2 bg-gray-50 border-gray-300 rounded-lg focus:border-sky-500 dark:focus:border-sky-500 focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
              onChange={handleChange}
            />
            <label className="mb-1 whitespace-normal font-semibold">
              Password
            </label>
            <input
              type="password"
              placeholder="**********"
              id="password"
              className="mb-4 p-2 bg-gray-50 border-gray-300 rounded-lg focus:border-sky-500 dark:focus:border-sky-500 focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
              onChange={handleChange}
            />
            <button
              className="flex justify-center font-bold border-2 border-sky-500 rounded-lg w-full text-center py-2 text-sm text-sky-500 hover:bg-sky-500 mx-auto hover:text-white my-4"
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
          <aside className="flex gap-2 text-sm mt-5">
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
