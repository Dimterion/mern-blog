import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowDown, FaArrowRight } from "react-icons/fa";
import CallToAction from "../components/CallToAction";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getposts");
      const data = await res.json();

      setPosts([data.posts[0], data.posts[1], data.posts[2]]);
    };

    fetchPosts();
  }, []);

  return (
    <main>
      <section className="flex flex-col gap-6 p-10 px-3 max-w-fit mx-auto">
        <h1 className="text-3xl font-bold md:text-6xl">
          Hi, I&apos;m Dmitrii.
        </h1>
        <p className="text-gray-500 text-lg dark:text-gray-400 max-w-6xl">
          A web developer, aspiringly coding daily and writing about it weekly.
        </p>
        <div className="flex gap-2 sm:gap-4">
          <a
            href="#home-posts"
            className="sm:text-lg text-sky-500 font-bold hover:underline w-fit flex items-center gap-1"
          >
            <FaArrowDown />
            View posts
          </a>
          <span className="text-sky-500 font-bold">|</span>
          <Link
            to="/projects"
            className="sm:text-lg text-sky-500 font-bold hover:underline w-fit flex items-center gap-1"
          >
            View projects <FaArrowRight />
          </Link>
        </div>
      </section>
      <section className="p-3 bg-sky-100 dark:bg-slate-700 mb-7 max-w-[1000px] mx-auto rounded-md">
        <CallToAction />
      </section>
      {posts && posts.length > 0 && (
        <section id="home-posts" className="flex flex-col gap-6 px-3 pb-7">
          <h2 className="text-2xl font-semibold text-center">Posts</h2>
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mx-auto mt-3">
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
