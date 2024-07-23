import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Interweave } from "interweave";
import { Spinner } from "flowbite-react";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";

export default function Post() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();

        if (!res.ok) {
          setError(true);
          setLoading(false);

          return;
        }

        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();

        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };

      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (loading)
    return (
      <main className="flex min-h-screen items-center justify-center">
        <Spinner size="xl" className="fill-sky-500 text-gray-300" />
      </main>
    );

  if (error)
    return (
      <main className="flex min-h-screen items-center justify-center">
        Error loading page.
      </main>
    );

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col p-3">
      <h1 className="mx-auto max-w-2xl p-3 text-center font-serif text-3xl lg:text-4xl">
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className="my-2 self-center rounded-2xl border-2 border-gray-400 px-4 py-1 text-sm font-semibold uppercase text-gray-500 hover:bg-gray-400 hover:text-gray-100 dark:border-gray-500 dark:hover:border-sky-500 dark:hover:bg-sky-500 dark:hover:text-gray-100"
      >
        {post && post.category}
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className="m-auto my-4 h-[30vh] max-h-[400px] w-full max-w-[1000px] rounded-md object-cover sm:h-full"
      />
      <aside className="mx-auto flex w-full max-w-2xl justify-between border-b border-slate-500 p-3 text-sm">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post.content.length / 1000).toFixed(0) > 0
            ? (post.content.length / 1000).toFixed(0)
            : "Less than 1"}{" "}
          min read
        </span>
      </aside>
      <section className="post-content mx-auto mb-6 w-full max-w-2xl p-3">
        <Interweave content={post && post.content} noWrap={true} />
      </section>
      <section className="mx-auto mb-7 max-w-[1000px] rounded-md bg-sky-100 p-3 dark:bg-slate-700">
        <CallToAction />
      </section>
      <CommentSection postId={post._id} />
      <section className="mb-5 flex flex-col items-center justify-center">
        <h1 className="mt-1 text-xl font-semibold">Recent articles</h1>
        <aside className="mt-5 grid grid-cols-1 justify-center gap-5 md:grid-cols-2 xl:grid-cols-3">
          {recentPosts &&
            recentPosts.map(
              (recentPost) =>
                post._id !== recentPost._id && (
                  <PostCard key={recentPost._id} post={recentPost} />
                ),
            )}
        </aside>
      </section>
    </main>
  );
}
