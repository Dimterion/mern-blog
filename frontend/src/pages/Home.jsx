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
      <section className="mx-auto flex max-w-fit flex-col gap-6 p-10 px-3 pb-8">
        <h1 className="text-3xl font-bold text-gray-600 md:text-6xl dark:text-gray-400">
          Hi, I&apos;m Dmitrii.
        </h1>
        <p className="max-w-6xl text-xl text-gray-500 dark:text-gray-400">
          A web developer, aspiringly coding daily and writing about it weekly.
        </p>
        <article className="flex gap-2 sm:gap-4">
          <a
            href="#home-posts"
            className="flex w-fit items-center gap-1 font-bold text-sky-500 hover:underline sm:text-lg"
          >
            <FaArrowDown />
            View posts
          </a>
          <span className="font-bold text-sky-500">|</span>
          <Link
            to="/projects"
            className="flex w-fit items-center gap-1 font-bold text-sky-500 hover:underline sm:text-lg"
          >
            View projects <FaArrowRight />
          </Link>
        </article>
      </section>
      <section className="mx-auto mb-7 max-w-[1000px] rounded-md bg-sky-100 p-3 dark:bg-slate-700">
        <CallToAction />
      </section>
      {posts && posts.length > 0 && (
        <section id="home-posts" className="flex flex-col gap-6 px-3 pb-7">
          <h2 className="text-center text-2xl font-semibold text-gray-600 dark:text-gray-400">
            Posts
          </h2>
          <section className="mx-auto mt-3 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </section>
          <Link
            to={"/search"}
            className="mx-auto mt-1 w-fit text-center text-lg font-bold text-sky-500 hover:underline"
          >
            View all posts
          </Link>
        </section>
      )}
    </main>
  );
}
