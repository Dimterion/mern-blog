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
      <section className="flex flex-col gap-6 p-28 px-3 max-w-fit mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to my Blog</h1>
        <p className="text-gray-500 text-lg dark:text-gray-400">
          Here is the description of the blog.
        </p>
        <Link
          to="/search"
          className="text-lg text-teal-500 font-bold hover:underline w-fit"
        >
          View all posts
        </Link>
      </section>
      <section className="p-3 bg-sky-100 dark:bg-slate-700">
        <CallToAction />
      </section>
      <section className="max-w-6xl mx-auto px-3 flex flex-col py-7">
        {posts && posts.length > 0 && (
          <article className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={"/search"}
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View all posts
            </Link>
          </article>
        )}
      </section>
    </main>
  );
}
