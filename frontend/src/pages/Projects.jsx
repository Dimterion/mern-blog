import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { Spinner } from "flowbite-react";
import CallToAction from "../components/CallToAction";

export default function Projects() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      const res = await fetch("/api/post/getposts?category=project");

      if (!res.ok) {
        setLoading(false);

        return;
      }

      if (res.ok) {
        const data = await res.json();

        setPosts(data.posts);
        setLoading(false);

        if (data.posts.length >= 6) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };

    fetchPosts();
  }, []);

  function handleSearch(e) {
    setSearchQuery(e.target.value);
  }

  function handleCheckbox(e) {
    const category = e.target.id;

    if (e.target.checked) {
      setSelectedCategories((prevCategories) => [...prevCategories, category]);
    } else {
      setSelectedCategories((prevCategories) =>
        prevCategories.filter((prevCategory) => prevCategory !== category),
      );
    }
  }

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);

    urlParams.set("startIndex", startIndex);

    const searchQuery = urlParams.toString();
    const res = await fetch(
      `/api/post/getposts?${searchQuery}&category=project`,
    );

    if (!res.ok) {
      return;
    }

    if (res.ok) {
      const data = await res.json();

      setPosts([...posts, ...data.posts]);

      if (data.posts.length >= 6) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  const displayedProjects = posts
    .filter(
      (project) =>
        selectedCategories.length === 0 ||
        selectedCategories.includes(project.category),
    )
    .filter(
      (project) =>
        project.title
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase()) ||
        project.category
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase()),
    )
    .map((project) => (
      <section
        key={project._id}
        className="project mt-2 max-w-[300px] space-y-2"
      >
        <article className="group relative flex cursor-pointer justify-center overflow-hidden rounded-xl border border-gray-300 dark:border-gray-600">
          <img
            src={project.image}
            alt={project.title}
            className="h-[200px] max-h-[40vh] w-full object-cover"
          />
          <Link
            to={`/post/${project.slug}`}
            className="absolute bottom-0 left-0 right-0 translate-y-full bg-sky-500 py-1 text-center text-white transition duration-500 group-hover:translate-y-0"
          >
            {project.link || "Link"}
          </Link>
        </article>
        <p className="font-semibold">{project.title}</p>
        <pre>{project.category}</pre>
      </section>
    ));

  return (
    <main className="mx-auto mb-6 flex min-h-screen flex-col items-center justify-center gap-6 p-3">
      <h1 className="my-6 text-3xl font-semibold text-gray-600 dark:text-gray-400">
        Projects
      </h1>
      <section>
        <article className="relative mb-6">
          <input
            type="text"
            id="search"
            className="rounded-md border-gray-300 bg-gray-50 p-2 pl-9 focus:border-sky-500 focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:focus:border-sky-500"
            placeholder="Search projects..."
            onChange={handleSearch}
          />
          <AiOutlineSearch className="absolute bottom-1 left-3 -translate-y-1/2" />
        </article>
      </section>
      <section className="container mx-auto flex max-w-6xl flex-col md:flex-row">
        <article className="w-full max-w-[10rem] space-y-4 p-2 text-gray-600 dark:text-gray-400">
          <h2 className="text-xl font-semibold">Category</h2>
          <aside className="flex gap-2 sm:flex-col">
            <div className="flex flex-row items-center">
              <input
                type="checkbox"
                id="project"
                className="mr-1 cursor-pointer rounded bg-gray-100 p-2 sm:mr-2 dark:bg-gray-400"
                onChange={handleCheckbox}
              />
              <label htmlFor="project" className="cursor-pointer">
                Project
              </label>
            </div>
            <div className="flex flex-row items-center">
              <input
                type="checkbox"
                id="thoughts"
                className="mr-1 cursor-pointer rounded bg-gray-100 p-2 sm:mr-2 dark:bg-gray-400"
                onChange={handleCheckbox}
              />
              <label htmlFor="thoughts" className="cursor-pointer">
                Thoughts
              </label>
            </div>
            <div className="flex flex-row items-center">
              <input
                type="checkbox"
                id="coding"
                className="mr-1 cursor-pointer rounded bg-gray-100 p-2 sm:mr-2 dark:bg-gray-400"
                onChange={handleCheckbox}
              />
              <label htmlFor="coding" className="cursor-pointer">
                Coding
              </label>
            </div>
          </aside>
        </article>
        {loading ? (
          <article className="mx-auto my-16">
            <Spinner size="xl" className="fill-sky-500 text-gray-300" />
          </article>
        ) : (
          <article className="mx-auto grid grid-cols-1 place-content-center gap-6 p-2 sm:grid-cols-2 md:grid-cols-3">
            {displayedProjects.length > 0 ? (
              displayedProjects
            ) : (
              <p className="mx-auto text-center font-semibold">
                No projects found at the moment.
              </p>
            )}
          </article>
        )}
      </section>
      {showMore && displayedProjects.length > 0 && (
        <button
          onClick={handleShowMore}
          className="mx-auto mb-4 w-fit text-lg font-bold text-sky-500 hover:underline"
        >
          Show More
        </button>
      )}
      <section className="mx-auto mb-7 max-w-[1000px] rounded-md bg-sky-100 p-3 dark:bg-slate-700">
        <CallToAction />
      </section>
    </main>
  );
}
