import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
      <section className="flex flex-col items-center gap-6 px-12 py-4 border-b md:border-b-0 md:border-r md:min-h-screen border-gray-300 dark:border-gray-600">
        <form
          className="flex flex-col gap-2 max-w-[200px] mx-auto"
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
              className="p-2 bg-gray-50 border-gray-300 rounded-md focus:border-sky-500 dark:focus:border-sky-500 focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
            />
          </aside>
          <aside className="mx-2 flex flex-col gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              onChange={handleChange}
              value={sidebarData.sort || ""}
              id="sort"
              className="p-2 bg-gray-50 border-gray-300 rounded-md focus:border-sky-500 dark:focus:border-sky-500 focus:ring-0 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
            >
              <option
                value="desc"
                className="bg-gray-50 dark:bg-gray-700 cursor-pointer"
              >
                Latest
              </option>
              <option value="asc" className="bg-gray-50 dark:bg-gray-700">
                Oldest
              </option>
            </select>
          </aside>
          <aside className="mx-2 flex flex-col gap-2">
            <label className="font-semibold min-w-[10rem]">Category:</label>
            <select
              onChange={handleChange}
              value={sidebarData.category || ""}
              id="category"
              className="p-2 bg-gray-50 border-gray-300 rounded-md focus:border-sky-500 dark:focus:border-sky-500 focus:ring-0 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
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
            className="font-bold mt-6 border-2 border-sky-500 rounded-lg w-56 max-w-[200px] text-center py-2 text-sm bg-sky-500 text-white mx-auto hover:text-sky-500 hover:bg-white dark:hover:bg-transparent"
          >
            Search
          </button>
        </form>
        <Link
          to="/search"
          className="font-bold border-2 border-sky-500 rounded-lg w-56 max-w-[200px] text-center py-2 text-sm text-sky-500 hover:bg-sky-500 mx-auto hover:text-white"
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
      <section className="w-full flex flex-col">
        <article className="p-4 flex flex-wrap gap-4 justify-center md:justify-start">
          {!loading && posts.length === 0 && (
            <p className="text-xl text-gray-500">No posts found.</p>
          )}
          {loading && <p className="text-xl text-gray-500">Loading...</p>}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
        </article>
        {showMore && (
          <button
            onClick={handleShowMore}
            className="text-sky-500 text-lg hover:underline p-7 w-fit mx-auto font-bold"
          >
            Show More
          </button>
        )}
      </section>
    </main>
  );
}
