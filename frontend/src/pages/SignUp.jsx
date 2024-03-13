import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
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

      if (data.success === false) {
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
            Sign up with your email and password or your Google account.
          </p>
        </article>
        <article className="flex-1">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <Label value="Username" />
            <TextInput
              type="text"
              placeholder="Name"
              id="username"
              className="mb-4"
              onChange={handleChange}
            />
            <Label value="Email" />
            <TextInput
              type="email"
              placeholder="emailname@email.com"
              id="email"
              className="mb-4"
              onChange={handleChange}
            />
            <Label value="Password" />
            <TextInput
              type="password"
              placeholder="**********"
              id="password"
              className="mb-4"
              onChange={handleChange}
            />
            <Button
              className="mb-4"
              gradientDuoTone="purpleToBlue"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
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
