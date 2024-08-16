import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MdOutlineClear } from "react-icons/md";
import { MdRefresh } from "react-icons/md";
import { Spinner } from "flowbite-react";
import ProjectCard from "../components/ProjectCard";
import CallToAction from "../components/CallToAction";

export default function Projects() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [checkboxes, setCheckboxes] = useState({
    general: false,
    javascript: false,
    react: false,
    nextjs: false,
  });

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

  function clearSearch() {
    setSearchQuery("");
  }

  function handleCheckbox(e) {
    const category = e.target.id;

    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [category]: !prevCheckboxes[category],
    }));

    if (e.target.checked) {
      setSelectedCategories((prevCategories) => [...prevCategories, category]);
    } else {
      setSelectedCategories((prevCategories) =>
        prevCategories.filter((prevCategory) => prevCategory !== category),
      );
    }
  }

  const resetBtnEnabled = Object.values(checkboxes).some((e) => e);

  function handleUncheck() {
    setSelectedCategories([]);
    setCheckboxes({
      general: false,
      javascript: false,
      react: false,
      nextjs: false,
    });
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
        selectedCategories.includes(project.technology),
    )
    .filter(
      (project) =>
        project.title
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase()) ||
        project.technology
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase()),
    )
    .map((project) => (
      <ProjectCard
        key={project._id}
        project={project}
        handleUncheck={handleUncheck}
        setCheckboxes={setCheckboxes}
        setSelectedCategories={setSelectedCategories}
      />
    ));

  return (
    <main className="mx-auto mb-6 flex min-h-screen flex-col items-center justify-center gap-4 p-3">
      <h1 className="my-6 text-3xl font-semibold text-gray-600 dark:text-gray-400">
        Projects
      </h1>
      <section>
        <article className="relative">
          <input
            type="text"
            id="search"
            value={searchQuery}
            className="rounded-md border-gray-300 bg-gray-50 p-2 pl-9 shadow-lg focus:border-sky-500 focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:focus:border-sky-500"
            placeholder="Search projects..."
            onChange={handleSearch}
          />
          <AiOutlineSearch className="absolute bottom-1 left-3 -translate-y-1/2" />
          {searchQuery.length > 0 && (
            <button onClick={clearSearch}>
              <MdOutlineClear className="absolute bottom-1 right-3 -translate-y-1/2" />
            </button>
          )}
        </article>
      </section>
      <section className="container mx-auto flex max-w-6xl flex-col md:flex-row">
        <article className="mb-2 w-full space-y-4 p-2 text-gray-600 md:max-w-[10rem] dark:text-gray-400">
          <section className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">Category</h2>
            <button
              aria-label="Reset filters"
              className={`w-fit rounded-lg border-2 border-sky-500 bg-sky-500 text-gray-200 shadow-lg dark:hover:bg-transparent ${resetBtnEnabled ? "hover:bg-white hover:text-sky-500" : "opacity-50"}`}
              onClick={handleUncheck}
              disabled={resetBtnEnabled ? false : true}
            >
              <MdRefresh />
            </button>
          </section>
          <aside className="flex flex-wrap gap-3 md:flex-col md:gap-2">
            <article className="flex flex-row items-center hover:text-sky-500">
              <input
                type="checkbox"
                checked={checkboxes.general}
                id="general"
                className="mr-1 cursor-pointer rounded bg-gray-100 p-2 shadow-lg md:mr-2 dark:bg-gray-400"
                onChange={handleCheckbox}
              />
              <label htmlFor="general" className="cursor-pointer">
                General
              </label>
            </article>
            <article className="flex flex-row items-center hover:text-sky-500">
              <input
                type="checkbox"
                checked={checkboxes.javascript}
                id="javascript"
                className="mr-1 cursor-pointer rounded bg-gray-100 p-2 shadow-lg md:mr-2 dark:bg-gray-400"
                onChange={handleCheckbox}
              />
              <label htmlFor="javascript" className="cursor-pointer">
                JavaScript
              </label>
            </article>
            <article className="flex flex-row items-center hover:text-sky-500">
              <input
                type="checkbox"
                checked={checkboxes.react}
                id="react"
                className="mr-1 cursor-pointer rounded bg-gray-100 p-2 shadow-lg md:mr-2 dark:bg-gray-400"
                onChange={handleCheckbox}
              />
              <label htmlFor="react" className="cursor-pointer">
                React
              </label>
            </article>
            <article className="flex flex-row items-center hover:text-sky-500">
              <input
                type="checkbox"
                checked={checkboxes.nextjs}
                id="nextjs"
                className="mr-1 cursor-pointer rounded bg-gray-100 p-2 shadow-lg md:mr-2 dark:bg-gray-400"
                onChange={handleCheckbox}
              />
              <label htmlFor="nextjs" className="cursor-pointer">
                Next.js
              </label>
            </article>
          </aside>
        </article>
        {loading ? (
          <article className="mx-auto my-16">
            <Spinner size="xl" className="fill-sky-500 text-gray-300" />
          </article>
        ) : (
          <article className="mx-auto grid grid-cols-1 gap-6 p-2 sm:grid-cols-2 md:min-h-[30rem] lg:grid-cols-3">
            {displayedProjects.length > 0 ? (
              displayedProjects
            ) : (
              <p className="mt-4 text-lg font-semibold text-gray-600 md:mt-20 dark:text-gray-400">
                No projects found at the moment.
              </p>
            )}
          </article>
        )}
      </section>
      {showMore && displayedProjects.length > 1 && (
        <button
          aria-label="Show more"
          onClick={handleShowMore}
          className="mx-auto mt-2 w-fit text-lg font-bold text-sky-500 hover:underline"
        >
          Show More
        </button>
      )}
      <section className="mx-auto my-7 max-w-[1000px] rounded-md bg-sky-100 p-3 dark:bg-slate-700">
        <CallToAction />
      </section>
    </main>
  );
}
