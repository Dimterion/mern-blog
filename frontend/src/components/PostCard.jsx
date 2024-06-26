import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function PostCard({ post }) {
  return (
    <article className="group relative w-[90vw] border border-sky-500 hover:border-2 max-w-[350px] h-[325px] overflow-hidden rounded-lg transition-all sm:w-[350px]">
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt="Post cover."
          className="h-[230px] w-full object-cover group-hover:h-[190px] transition-all duration-500 z-20"
        />
      </Link>
      <aside className="p-3 flex flex-col gap-2">
        <p className="text-xl font-semibold line-clamp-2">{post.title}</p>
        <span className="italic text-md">{post.category}</span>
        <Link
          to={`/post/${post.slug}`}
          className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border-2 border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white transition-all duration-500 text-center py-2 rounded-md m-2 font-bold"
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
