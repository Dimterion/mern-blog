import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Table } from "flowbite-react";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";

export default function DashboardComp() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/getusers?limit=5");
        const data = await res.json();

        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts?limit=5");
        const data = await res.json();

        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/getComments?limit=5");
        const data = await res.json();

        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);

  return (
    <section className="p-3 md:mx-auto">
      <section className="flex flex-wrap justify-center gap-4">
        <article className="mx-2 flex w-full flex-col gap-4 rounded-md bg-gray-100 p-3 shadow-md lg:mx-0 lg:w-60 dark:bg-slate-800">
          <div className="flex justify-between">
            <div>
              <h3 className="text-md uppercase text-gray-500">Total Users</h3>
              <p className="text-2xl">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="rounded-full bg-teal-600 p-3 text-5xl text-white shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="flex items-center text-green-500">
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </article>
        <article className="mx-2 flex w-full flex-col gap-4 rounded-md bg-gray-100 p-3 shadow-md lg:mx-0 lg:w-60 dark:bg-slate-800">
          <div className="flex justify-between">
            <div>
              <h3 className="text-md uppercase text-gray-500">
                Total Comments
              </h3>
              <p className="text-2xl">{totalComments}</p>
            </div>
            <HiAnnotation className="rounded-full bg-indigo-600 p-3 text-5xl text-white shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="flex items-center text-green-500">
              <HiArrowNarrowUp />
              {lastMonthComments}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </article>
        <article className="mx-2 flex w-full flex-col gap-4 rounded-md bg-gray-100 p-3 shadow-md lg:mx-0 lg:w-60 dark:bg-slate-800">
          <div className="flex justify-between">
            <div>
              <h3 className="text-md uppercase text-gray-500">Total Posts</h3>
              <p className="text-2xl">{totalPosts}</p>
            </div>
            <HiDocumentText className="rounded-full bg-lime-600 p-3 text-5xl text-white shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="flex items-center text-green-500">
              <HiArrowNarrowUp />
              {lastMonthPosts}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </article>
      </section>
      <section className="mx-auto flex flex-wrap justify-center gap-4 py-3">
        <article className="mx-2 flex w-full flex-col rounded-md bg-gray-100 p-2 shadow-md lg:mx-0 lg:w-auto lg:max-w-[260px] dark:bg-gray-800">
          <div className="flex justify-between py-3 text-sm font-semibold">
            <h1 className="p-2 text-center uppercase">Recent users</h1>
            <Link
              className="rounded-lg border-2 border-sky-500 bg-sky-500 p-2 font-semibold uppercase text-gray-100 hover:bg-gray-100 hover:text-sky-500 dark:hover:bg-transparent"
              to={"/dashboard?tab=users"}
            >
              See all
            </Link>
          </div>
          <Table hoverable>
            <Table.Head className="table-head">
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>User name</Table.HeadCell>
            </Table.Head>
            {users &&
              users.map((user) => (
                <Table.Body key={user._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      <img
                        src={user.profilePicture}
                        alt="User"
                        className="size-10 rounded-full bg-gray-500"
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </article>
        <article className="mx-2 flex w-full flex-col rounded-md bg-gray-100 p-2 shadow-md lg:mx-0 lg:w-auto lg:max-w-[260px] dark:bg-gray-800">
          <div className="flex justify-between py-3 text-sm font-semibold">
            <h1 className="p-2 text-center uppercase">Recent comments</h1>
            <Link
              className="rounded-lg border-2 border-sky-500 bg-sky-500 p-2 font-semibold uppercase text-gray-100 hover:bg-gray-100 hover:text-sky-500 dark:hover:bg-transparent"
              to={"/dashboard?tab=comments"}
            >
              See all
            </Link>
          </div>
          {comments.length > 0 ? (
            <Table hoverable>
              <Table.Head className="table-head">
                <Table.HeadCell>Comment content</Table.HeadCell>
                <Table.HeadCell>Likes</Table.HeadCell>
              </Table.Head>
              {comments &&
                comments.map((comment) => (
                  <Table.Body key={comment._id} className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="w-96">
                        <p className="line-clamp-2">{comment.content}</p>
                      </Table.Cell>
                      <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
            </Table>
          ) : (
            <p className="mx-auto mb-2 w-full rounded-lg bg-white p-2 text-center font-semibold text-gray-500 dark:bg-gray-700 dark:text-gray-300">
              No comments yet.
            </p>
          )}
        </article>
        <article className="mx-2 flex w-full flex-col rounded-md bg-gray-100 p-2 shadow-md lg:mx-0 lg:w-auto lg:max-w-[260px] dark:bg-gray-800">
          <div className="flex justify-between py-3 text-sm font-semibold">
            <h1 className="p-2 text-center uppercase">Recent posts</h1>
            <Link
              className="rounded-lg border-2 border-sky-500 bg-sky-500 p-2 font-semibold uppercase text-gray-100 hover:bg-gray-100 hover:text-sky-500 dark:hover:bg-transparent"
              to={"/dashboard?tab=posts"}
            >
              See all
            </Link>
          </div>
          {posts.length > 0 ? (
            <Table hoverable className="text-center">
              <Table.Head className="table-head">
                <Table.HeadCell>Post image</Table.HeadCell>
                <Table.HeadCell>Post title</Table.HeadCell>
              </Table.Head>
              {posts &&
                posts.map((post) => (
                  <Table.Body key={post._id} className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell>
                        <Link to={`/post/${post.slug}`}>
                          <img
                            src={post.image}
                            alt="Post image"
                            className="m-auto size-10 rounded-md bg-gray-500"
                          />
                        </Link>
                      </Table.Cell>
                      <Table.Cell className="w-96">
                        <Link
                          className="font-medium text-gray-600 dark:text-gray-300"
                          to={`/post/${post.slug}`}
                        >
                          {post.title}
                        </Link>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
            </Table>
          ) : (
            <p className="mx-auto mb-2 w-full rounded-lg bg-white p-2 text-center font-semibold text-gray-500 dark:bg-gray-700 dark:text-gray-300">
              No posts yet.
            </p>
          )}
        </article>
      </section>
    </section>
  );
}
