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
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
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
    <section className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <aside className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as:</p>
          <img
            className="size-5 object-cover rounded-full"
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
        <aside className="text-sm text-sky-500 my-5 flex gap-1">
          You must be signed in to comment.
          <Link className="text-blue-500 hover:underline" to={"/sign-in"}>
            Sign In
          </Link>
        </aside>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-sky-500 rounded-md p-3"
        >
          <Textarea
            placeholder="Add a comment..."
            rows="3"
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <article className="flex justify-between items-center mt-5">
            <p className="text-gray-500 text-xs">
              {200 - comment.length} characters remaining.
            </p>
            <button
              className="border-2 border-sky-500 font-semibold text-sky-500 hover:text-gray-100 hover:bg-sky-500 rounded-lg px-4 py-2 uppercase text-sm"
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
        <Modal.Header className="bg-gray-200 rounded-t-md" />
        <Modal.Body className="bg-gray-200 rounded-b-md">
          <section className="text-center">
            <HiOutlineExclamationCircle className="size-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment?
            </h3>
            <section className="flex justify-center gap-4">
              <button
                className="border p-2 rounded-md w-28 bg-red-500 text-gray-100 hover:opacity-85"
                onClick={() => handleDelete(commentToDelete)}
              >
                Yes, I&apos;m sure
              </button>
              <button
                className="bg-gray-400 px-2 py-1 rounded-md w-28 text-gray-100 hover:opacity-85"
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
