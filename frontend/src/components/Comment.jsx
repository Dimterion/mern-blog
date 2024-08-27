import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Textarea } from "flowbite-react";
import { FaThumbsUp } from "react-icons/fa";
import moment from "moment";

export default function Comment({ comment, onLike, onEdit, onDelete }) {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();

        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [comment]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });

      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className="mb-4 flex border-b p-1 text-sm dark:border-gray-600">
      <section className="mr-1 flex-shrink-0">
        <img
          className="size-10 rounded-full bg-gray-200"
          src={
            user.profilePicture
              ? user.profilePicture
              : "https://raw.githubusercontent.com/Dimterion/Posts-app/master/src/assets/svg/personIcon.svg"
          }
          alt={user.username ? user.username : "Anonymous user"}
        />
      </section>
      <section className="flex-1">
        <article className="mb-1 flex items-center">
          <span className="mr-1 truncate text-xs font-bold text-gray-600 dark:text-gray-400">
            {user.username ? `@${user.username}` : "Anonymous user"}
          </span>
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {moment(comment.createdAt).fromNow()}
          </span>
        </article>
        {isEditing ? (
          <>
            <Textarea
              className="mb-4"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <article className="mb-4 flex justify-end gap-2 text-xs">
              <button
                className="w-24 rounded-lg border-2 border-sky-500 px-4 py-1 text-sm font-semibold uppercase text-sky-500 hover:bg-sky-500 hover:text-gray-100"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="w-24 rounded-lg border-2 border-sky-500 px-4 py-1 text-sm font-semibold uppercase text-sky-500 hover:bg-sky-500 hover:text-gray-100"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </article>
          </>
        ) : (
          <>
            <p className="break-all pb-2 text-gray-600 dark:text-gray-400">
              {comment.content}
            </p>
            <article className="mb-2 flex max-w-fit items-center gap-2 border-t pt-2 text-xs dark:border-gray-700">
              <button
                type="button"
                onClick={() => onLike(comment._id)}
                className={`text-gray-400 hover:text-sky-500 ${
                  currentUser &&
                  comment.likes.includes(currentUser._id) &&
                  "!text-sky-500"
                }`}
              >
                <FaThumbsUp className="text-sm" />
              </button>
              <p className="text-gray-400">
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    " " +
                    (comment.numberOfLikes === 1 ? "like" : "likes")}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <>
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="text-gray-400 hover:text-sky-500"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(comment._id)}
                      className="text-red-400"
                    >
                      Delete
                    </button>
                  </>
                )}
            </article>
          </>
        )}
      </section>
    </section>
  );
}

Comment.propTypes = {
  comment: PropTypes.object,
  onLike: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};
