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
        prevCategories.filter((prevCategory) => prevCategory !== category)
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
      `/api/post/getposts?${searchQuery}&category=project`
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
        selectedCategories.includes(project.category)
    )
    .filter(
      (project) =>
        project.title
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase()) ||
        project.category
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase())
    )
    .map((project) => (
      <section
        key={project._id}
        className="project space-y-2 mt-2 max-w-[300px]"
      >
        <article className="flex justify-center relative overflow-hidden group cursor-pointer border border-gray-300 dark:border-gray-600 rounded-xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-[200px] max-h-[40vh] object-cover"
          />
          <Link
            to="/"
            className="bg-sky-500 text-white absolute bottom-0 left-0 right-0 text-center py-1 translate-y-full transition group-hover:translate-y-0 duration-300"
          >
            Link
          </Link>
        </article>
        <p className="font-semibold">{project.title}</p>
        <pre>{project.category}</pre>
      </section>
    ));

  return (
    <main className="min-h-screen mx-auto flex justify-center items-center flex-col gap-6 p-3 mb-6">
      <h1 className="text-3xl font-semibold">Projects</h1>
      <section>
        <article className="relative">
          <input
            type="text"
            id="search"
            className="p-2 pl-9 bg-gray-50 border-gray-300 rounded-md focus:border-sky-500 dark:focus:border-sky-500 focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
            placeholder="Search projects..."
            onChange={handleSearch}
          />
          <AiOutlineSearch className="absolute left-3 bottom-1 -translate-y-1/2" />
        </article>
      </section>
      <section className="flex flex-col md:flex-row mx-auto container max-w-6xl">
        <article className="space-y-4 p-2 w-full max-w-[10rem]">
          <h2 className="text-xl font-semibold">Category</h2>
          <aside className="flex sm:flex-col gap-2">
            <div className="flex flex-row items-center">
              <input
                type="checkbox"
                id="project"
                className="mr-1 sm:mr-2 rounded p-2 cursor-pointer"
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
                className="mr-1 sm:mr-2 rounded p-2 cursor-pointer"
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
                className="mr-1 sm:mr-2 rounded p-2 cursor-pointer"
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
            <Spinner size="xl" />
          </article>
        ) : (
          <article className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-content-center p-2">
            {displayedProjects}
          </article>
        )}
      </section>
      {showMore && (
        <button
          onClick={handleShowMore}
          className="text-sky-500 text-lg hover:underline p-7 w-fit mx-auto font-bold"
        >
          Show More
        </button>
      )}
      <section className="p-3 bg-sky-100 dark:bg-slate-700 mb-7 max-w-[1000px] mx-auto rounded-md">
        <CallToAction />
      </section>
    </main>
  );
}
