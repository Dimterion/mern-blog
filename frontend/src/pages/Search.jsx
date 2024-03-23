import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Select, TextInput } from "flowbite-react";
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
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
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

        if (data.posts.length === 9) {
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

    urlParams.set("searchTerm", sidebarData.searchTerm);
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

      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  return (
    <main className="flex flex-col md:flex-row">
      <section className="px-12 py-4 border-b md:border-b-0 md:border-r md:min-h-screen border-gray-300">
        <form
          className="flex flex-col gap-2 max-w-[200px] mx-auto"
          onSubmit={handleSubmit}
        >
          <aside className="mx-2 flex flex-col gap-2">
            <label className="whitespace-normal font-semibold">
              Search term:
            </label>
            <TextInput
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </aside>
          <aside className="mx-2 flex flex-col gap-2">
            <label className="font-semibold">Sort:</label>
            <Select
              onChange={handleChange}
              value={sidebarData.sort || ""}
              id="sort"
            >
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </aside>
          <aside className="mx-2 flex flex-col gap-2">
            <label className="font-semibold">Category:</label>
            <Select
              onChange={handleChange}
              value={sidebarData.category || ""}
              id="category"
            >
              <option value="uncategorized">Uncategorized</option>
              <option value="project">Project</option>
              <option value="coding">Coding</option>
              <option value="thoughts">Thoughts</option>
            </Select>
          </aside>
          <Button
            type="submit"
            outline
            gradientDuoTone="purpleToBlue"
            className="mt-4"
          >
            Search
          </Button>
        </form>
      </section>
      <section className="w-full">
        <article className="p-4 flex flex-wrap gap-4">
          {!loading && posts.length === 0 && (
            <p className="text-xl text-gray-500">No posts found.</p>
          )}
          {loading && <p className="text-xl text-gray-500">Loading...</p>}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
          {showMore && (
            <button
              onClick={handleShowMore}
              className="text-sky-500 text-lg hover:underline p-7 w-full font-bold"
            >
              Show More
            </button>
          )}
        </article>
      </section>
    </main>
  );
}
