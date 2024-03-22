import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getposts");
      const data = await res.json();

      setPosts(data.posts);
    };

    fetchPosts();
  }, []);

  return (
    <main>
      <section className="flex flex-col gap-6 p-16 px-3 max-w-fit mx-auto">
        <h1 className="text-3xl font-bold md:text-6xl">Welcome to my Blog</h1>
        <p className="text-gray-500 text-lg dark:text-gray-400 max-w-6xl">
          Some text placeholder here.
        </p>
        <Link
          to="/search"
          className="text-lg text-sky-500 font-bold hover:underline w-fit"
        >
          View all posts
        </Link>
      </section>
      <section className="p-3 bg-sky-100 dark:bg-slate-700 mb-7">
        <CallToAction />
      </section>
      {posts && posts.length > 0 && (
        <section className="flex flex-col gap-6 px-3 pb-7">
          <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto mt-3">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </section>
          <Link
            to={"/search"}
            className="text-lg text-sky-500 hover:underline text-center w-fit mx-auto mt-1 font-bold"
          >
            View all posts
          </Link>
        </section>
      )}
    </main>
  );
}
