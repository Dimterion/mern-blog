import { Link, NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa6";
import { SlLogin } from "react-icons/sl";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";

export default function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Navbar className="border-b-2 px-1 dark:border-gray-600">
      <Link
        to="/"
        className="rounded-br-full rounded-tl-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 px-4 py-1 text-lg font-semibold text-white shadow-lg hover:opacity-95 sm:px-6 sm:text-xl"
      >
        Dimterion
      </Link>
      <section className="header-section flex items-center gap-1 md:order-2">
        <Link
          aria-label="Go to search page"
          to="/search"
          className="rounded-lg border p-2 text-gray-500 shadow-lg hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100"
        >
          <AiOutlineSearch />
        </Link>
        <button
          aria-label={theme === "light" ? "Dark mode" : "Light mode"}
          className="rounded-lg border p-2 text-gray-500 shadow-lg hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100"
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                className="shadow-lg hover:opacity-95"
                alt="User"
                img={currentUser.profilePicture}
                size="sm"
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block truncate text-sm font-medium">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <button
              aria-label="Sign-in"
              className="rounded-lg border p-2 text-gray-500 shadow-lg hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100"
            >
              <SlLogin />
            </button>
          </Link>
        )}
        <Navbar.Toggle />
      </section>
      <Navbar.Collapse>
        <Navbar.Link
          className="w-fit border-none bg-transparent text-lg hover:bg-transparent dark:hover:bg-transparent"
          active={path === "/"}
          as={"div"}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-sky-500"
                : "text-gray-500 hover:text-sky-500 dark:text-gray-400 dark:hover:text-sky-500"
            }
          >
            Home
          </NavLink>
        </Navbar.Link>
        <Navbar.Link
          className="w-fit border-none bg-transparent text-lg hover:bg-transparent dark:hover:bg-transparent"
          active={path === "/projects"}
          as={"div"}
        >
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-sky-500"
                : "text-gray-500 hover:text-sky-500 dark:text-gray-400 dark:hover:text-sky-500"
            }
          >
            Projects
          </NavLink>
        </Navbar.Link>
        <Navbar.Link
          className="w-fit border-none bg-transparent text-lg hover:bg-transparent dark:hover:bg-transparent"
          active={path === "/about"}
          as={"div"}
        >
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "font-bold text-sky-500"
                : "text-gray-500 hover:text-sky-500 dark:text-gray-400 dark:hover:text-sky-500"
            }
          >
            About
          </NavLink>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
