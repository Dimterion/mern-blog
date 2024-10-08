import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { HiOutlineExternalLink } from "react-icons/hi";

export default function ProjectCard({
  project,
  handleUncheck,
  setCheckboxes,
  setSelectedCategories,
}) {
  function handleTagClick() {
    handleUncheck();

    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [project.technology]: true,
    }));

    setSelectedCategories((prevCategories) => [
      ...prevCategories,
      project.technology,
    ]);
  }

  return (
    <section className="mt-2 w-60 space-y-2">
      {project.link ? (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex justify-center overflow-hidden rounded-xl border border-gray-300 shadow-lg dark:border-gray-600"
        >
          <img
            src={project.image}
            alt={project.title}
            className="h-[200px] max-h-[40vh] w-full object-cover"
          />
          <p className="absolute bottom-0 left-0 right-0 flex translate-y-full flex-row items-center justify-center gap-2 bg-sky-500 py-1 text-center text-sm font-semibold uppercase text-gray-200 transition duration-500 group-hover:translate-y-0">
            View
            <HiOutlineExternalLink />
          </p>
        </a>
      ) : (
        <Link
          to={`/post/${project.slug}`}
          className="group relative flex justify-center overflow-hidden rounded-xl border border-gray-300 shadow-lg dark:border-gray-600"
        >
          <img
            src={project.image}
            alt={project.title}
            className="h-[200px] max-h-[40vh] w-full object-cover"
          />
          <p className="absolute bottom-0 left-0 right-0 translate-y-full bg-sky-500 py-1 text-center text-sm font-semibold uppercase text-gray-200 transition duration-500 group-hover:translate-y-0">
            View
          </p>
        </Link>
      )}
      <section className="flex flex-wrap items-center justify-between px-2">
        <p className="max-w-[65%] truncate text-sm font-semibold text-gray-600 dark:text-gray-400">
          {project.title}
        </p>
        <button
          onClick={handleTagClick}
          className="flex w-20 max-w-[35%] items-center justify-center truncate rounded-lg bg-sky-500 px-2 pb-1 text-sm font-semibold text-gray-200 shadow-lg hover:opacity-90"
        >
          {project.technology}
        </button>
      </section>
    </section>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.object,
  handleUncheck: PropTypes.func,
  setCheckboxes: PropTypes.func,
  setSelectedCategories: PropTypes.func,
};
