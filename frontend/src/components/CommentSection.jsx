import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Alert, Modal, Textarea } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import Comment from "../components/Comment";

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (comment.length > 200) {
      return;
    }

    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setComment("");
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);

        if (res.ok) {
          const data = await res.json();

          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");

        return;
      }

      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      });

      if (res.ok) {
        const data = await res.json();

        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment,
          ),
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c,
      ),
    );
  };

  const handleDelete = async (commentId) => {
    setShowModal(false);

    try {
      if (!currentUser) {
        navigate("/sign-in");

        return;
      }

      const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setComments(comments.filter((comment) => comment._id !== commentId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className="mx-auto w-full max-w-2xl p-3">
      {currentUser ? (
        <aside className="my-5 flex items-center gap-1 text-sm text-gray-500">
          <p>Signed in as:</p>
          <img
            className="size-5 rounded-full object-cover"
            src={currentUser.profilePicture}
            alt="Current user profile picture."
          />
          <Link
            to="/dashboard?tab=profile"
            className="text-xs text-sky-500 hover:underline"
          >
            @ {currentUser.username}
          </Link>
        </aside>
      ) : (
        <aside className="my-5 flex flex-col gap-2 text-sm text-sky-500">
          <p className="mb-2 w-fit border-b-2 border-sky-500 p-2">
            You must be signed in to comment.
          </p>
          <Link
            className="w-fit rounded-md border-2 border-sky-500 px-2 py-1 font-bold uppercase hover:bg-sky-500 hover:text-gray-100"
            to={"/sign-in"}
          >
            Sign In
          </Link>
        </aside>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="rounded-md border border-sky-500 p-3"
        >
          <Textarea
            placeholder="Add a comment..."
            rows="3"
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <article className="mt-5 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              {200 - comment.length} characters remaining.
            </p>
            <button
              className="rounded-lg border-2 border-sky-500 px-4 py-2 text-sm font-semibold uppercase text-sky-500 hover:bg-sky-500 hover:text-gray-100"
              type="submit"
            >
              Submit
            </button>
          </article>
          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {comments.length === 0 ? (
        <p className="my-5">No comments yet.</p>
      ) : (
        <>
          <aside className="my-5 flex items-center gap-1 font-semibold">
            <p>Comments:</p>
            <p className="text-sm">{comments.length}</p>
          </aside>
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={(commentId) => {
                setShowModal(true);
                setCommentToDelete(commentId);
              }}
            />
          ))}
        </>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header className="rounded-t-md bg-gray-200" />
        <Modal.Body className="rounded-b-md bg-gray-200">
          <section className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 size-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment?
            </h3>
            <section className="flex justify-center gap-4">
              <button
                className="w-28 rounded-md border bg-red-500 p-2 text-gray-100 hover:opacity-85"
                onClick={() => handleDelete(commentToDelete)}
              >
                Yes, I&apos;m sure
              </button>
              <button
                className="w-28 rounded-md bg-gray-400 px-2 py-1 text-gray-100 hover:opacity-85"
                onClick={() => setShowModal(false)}
              >
                No, cancel
              </button>
            </section>
          </section>
        </Modal.Body>
      </Modal>
    </section>
  );
}

CommentSection.propTypes = {
  postId: PropTypes.string,
};
