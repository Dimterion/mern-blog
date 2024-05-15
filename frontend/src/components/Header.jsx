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
    <Navbar className="border-b-2 px-1">
      <Link
        to="/"
        className="sm:text-xl px-4 sm:px-6 py-1 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 rounded-tl-full rounded-br-full text-white font-semibold"
      >
        Dimterion
      </Link>
      <section className="flex gap-1 md:order-2 items-center">
        <Link
          aria-label="Go to search page"
          to="/search"
          className="border rounded-lg p-2 dark:text-gray-500 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-100"
        >
          <AiOutlineSearch />
        </Link>
        <button
          aria-label={theme === "light" ? "Dark mode" : "Light mode"}
          className="border rounded-lg p-2 dark:text-gray-500 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-100"
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User" img={currentUser.profilePicture} size="sm" />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
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
              className="border rounded-lg p-2 dark:text-gray-500 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-100"
            >
              <SlLogin />
            </button>
          </Link>
        )}
        <Navbar.Toggle />
      </section>
      <Navbar.Collapse>
        <Navbar.Link
          className="bg-transparent border-none"
          active={path === "/"}
          as={"div"}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-sky-500 font-bold"
                : "text-gray-500 hover:text-sky-500"
            }
          >
            Home
          </NavLink>
        </Navbar.Link>
        <Navbar.Link
          className="bg-transparent border-none"
          active={path === "/projects"}
          as={"div"}
        >
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive
                ? "text-sky-500 font-bold"
                : "text-gray-500 hover:text-sky-500"
            }
          >
            Projects
          </NavLink>
        </Navbar.Link>
        <Navbar.Link
          className="bg-transparent border-none"
          active={path === "/about"}
          as={"div"}
        >
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-sky-500 font-bold"
                : "text-gray-500 hover:text-sky-500"
            }
          >
            About
          </NavLink>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
