import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function PostCard({ post }) {
  return (
    <article className="group relative h-[325px] w-[90vw] max-w-[350px] overflow-hidden rounded-lg border border-sky-500 shadow-lg transition-all hover:border-2 sm:w-[350px]">
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt="Post cover."
          className="z-20 h-[230px] w-full object-cover transition-all duration-500 group-hover:h-[190px]"
        />
      </Link>
      <aside className="flex flex-col gap-2 p-3">
        <p className="text-md line-clamp-2 font-semibold sm:text-xl">
          {post.title}
        </p>
        <span className="text-md italic">{post.category}</span>
        <Link
          to={`/post/${post.slug}`}
          className="absolute bottom-[-200px] left-0 right-0 z-10 m-2 rounded-md border-2 border-sky-500 py-1 text-center font-bold text-sky-500 transition-all duration-500 hover:bg-sky-500 hover:text-white group-hover:bottom-0 sm:py-2"
        >
          Read post
        </Link>
      </aside>
    </article>
  );
}

PostCard.propTypes = {
  post: PropTypes.object,
};
