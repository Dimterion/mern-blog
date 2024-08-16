import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function ProjectCard({
  project,
  setCheckboxes,
  setSelectedCategories,
}) {
  function handleTagClick() {
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
      <article className="group relative flex justify-center overflow-hidden rounded-xl border border-gray-300 shadow-lg dark:border-gray-600">
        <img
          src={project.image}
          alt={project.title}
          className="h-[200px] max-h-[40vh] w-full object-cover"
        />
        <Link
          to={`/post/${project.slug}`}
          className="absolute bottom-0 left-0 right-0 translate-y-full bg-sky-500 py-1 text-center font-semibold uppercase text-gray-200 transition duration-500 group-hover:translate-y-0"
        >
          {project.link || "View"}
        </Link>
      </article>
      <section className="flex flex-wrap justify-between px-2">
        <p className="text-lg font-semibold text-gray-600 dark:text-gray-400">
          {project.title}
        </p>
        <button
          onClick={handleTagClick}
          className="flex w-fit items-center rounded-lg bg-sky-500 px-2 pb-1 text-sm font-semibold text-gray-200"
        >
          {project.technology}
        </button>
      </section>
    </section>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.object,
  setCheckboxes: PropTypes.func,
  setSelectedCategories: PropTypes.func,
};
