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
      <main className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </main>
    );

  if (error)
    return (
      <main className="flex justify-center items-center min-h-screen">
        Error loading page.
      </main>
    );

  return (
    <main className="p-3 flex flex-col max-w-7xl mx-auto min-h-screen">
      <h1 className="text-3xl p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className="self-center my-2 px-4 py-1 text-sm border-2 border-gray-400 rounded-2xl uppercase font-semibold text-gray-500 hover:bg-gray-400 hover:text-gray-100 dark:border-gray-500 dark:hover:bg-sky-500 dark:hover:text-gray-100 dark:hover:border-sky-500"
      >
        {post && post.category}
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className="my-4 h-[30vh] sm:h-full max-h-[400px] w-full max-w-[1000px] m-auto object-cover rounded-md"
      />
      <aside className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-sm">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post.content.length / 1000).toFixed(0) > 0
            ? (post.content.length / 1000).toFixed(0)
            : "Less than 1"}{" "}
          min read
        </span>
      </aside>
      <section className="p-3 max-w-2xl mx-auto w-full post-content mb-6">
        <Interweave content={post && post.content} noWrap={true} />
      </section>
      <section className="p-3 bg-sky-100 dark:bg-slate-700 mb-7 max-w-[1000px] mx-auto rounded-md">
        <CallToAction />
      </section>
      <CommentSection postId={post._id} />
      <section className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-xl font-semibold mt-1">Recent articles</h1>
        <aside className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-5 justify-center">
          {recentPosts &&
            recentPosts.map(
              (recentPost) =>
                post._id !== recentPost._id && (
                  <PostCard key={recentPost._id} post={recentPost} />
                )
            )}
        </aside>
      </section>
    </main>
  );
}
