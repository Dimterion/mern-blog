import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";
import PostCard from "../components/PostCard";

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData((prevSidebarData) => ({
        ...prevSidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      }));
    }

    const fetchPosts = async () => {
      setLoading(true);

      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);

      if (!res.ok) {
        setLoading(false);

        return;
      }

      if (res.ok) {
        const data = await res.json();

        setPosts(data.posts);
        setLoading(false);

        if (data.posts.length === 6) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };

    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }

    if (e.target.id === "sort") {
      const order = e.target.value || "desc";

      setSidebarData({ ...sidebarData, sort: order });
    }

    if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";

      setSidebarData({ ...sidebarData, category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(location.search);

    urlParams.set("searchTerm", sidebarData.searchTerm || "");
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);

    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);

    urlParams.set("startIndex", startIndex);

    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);

    if (!res.ok) {
      return;
    }

    if (res.ok) {
      const data = await res.json();

      setPosts([...posts, ...data.posts]);

      if (data.posts.length === 6) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  return (
    <main className="flex flex-col md:flex-row">
      <section className="flex flex-col items-center gap-6 border-b px-12 py-4 md:min-h-screen md:border-b-0 md:border-r-2 dark:border-gray-600">
        <form
          className="mx-auto flex max-w-[200px] flex-col gap-2"
          onSubmit={handleSubmit}
        >
          <aside className="mx-2 flex flex-col gap-2">
            <label className="whitespace-normal font-semibold">
              Search term:
            </label>
            <input
              placeholder="Search posts..."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm || ""}
              onChange={handleChange}
              className="rounded-md border-gray-300 bg-gray-50 p-2 shadow-lg focus:border-sky-500 focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:focus:border-sky-500"
            />
          </aside>
          <aside className="mx-2 flex flex-col gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              onChange={handleChange}
              value={sidebarData.sort || ""}
              id="sort"
              className="cursor-pointer rounded-md border-gray-300 bg-gray-50 p-2 shadow-lg focus:border-sky-500 focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:focus:border-sky-500"
            >
              <option
                value="desc"
                className="cursor-pointer bg-gray-50 dark:bg-gray-700"
              >
                Latest
              </option>
              <option value="asc" className="bg-gray-50 dark:bg-gray-700">
                Oldest
              </option>
            </select>
          </aside>
          <aside className="mx-2 flex flex-col gap-2">
            <label className="min-w-[10rem] font-semibold">Category:</label>
            <select
              onChange={handleChange}
              value={sidebarData.category || ""}
              id="category"
              className="cursor-pointer rounded-md border-gray-300 bg-gray-50 p-2 shadow-lg focus:border-sky-500 focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:focus:border-sky-500"
            >
              <option
                value="uncategorized"
                className="bg-gray-50 dark:bg-gray-700"
              >
                Uncategorized
              </option>
              <option value="project" className="bg-gray-50 dark:bg-gray-700">
                Project
              </option>
              <option value="coding" className="bg-gray-50 dark:bg-gray-700">
                Coding
              </option>
              <option value="thoughts" className="bg-gray-50 dark:bg-gray-700">
                Thoughts
              </option>
            </select>
          </aside>
          <button
            type="submit"
            className="mx-auto mt-6 w-56 max-w-[200px] rounded-lg border-2 border-sky-500 bg-sky-500 py-2 text-center text-sm font-bold text-white shadow-lg hover:bg-white hover:text-sky-500 dark:hover:bg-transparent"
          >
            Search
          </button>
        </form>
        <Link
          to="/search"
          className="mx-auto w-56 max-w-[200px] rounded-lg border-2 border-sky-500 py-2 text-center text-sm font-bold text-sky-500 shadow-lg hover:bg-sky-500 hover:text-white"
          onClick={() =>
            setSidebarData({
              searchTerm: "",
              sort: "desc",
              category: "uncategorized",
            })
          }
        >
          All posts
        </Link>
      </section>
      <section className="flex w-full flex-col">
        <article className="flex flex-wrap justify-center gap-4 p-4 sm:px-16 sm:pt-16 lg:justify-start">
          {!loading && posts.length === 0 && (
            <p className="text-xl text-gray-500">No posts found.</p>
          )}
          {loading && (
            <Spinner size="xl" className="fill-sky-500 text-gray-300" />
          )}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
        </article>
        {showMore && (
          <button
            onClick={handleShowMore}
            className="mx-auto w-fit p-7 text-lg font-bold text-sky-500 hover:underline"
          >
            Show More
          </button>
        )}
      </section>
    </main>
  );
}
