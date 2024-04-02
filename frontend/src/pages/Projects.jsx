import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { projects } from "../assets/projects/projectsList";
import CallToAction from "../components/CallToAction";

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  function handleSearch(e) {
    setSearchQuery(e.target.value);
  }

  function handleCheckbox(e) {
    const category = e.target.id;

    if (e.target.checked) {
      setSelectedCategories((prevCategories) => [...prevCategories, category]);
    } else {
      setSelectedCategories((prevCategories) =>
        prevCategories.filter((prevCategory) => prevCategory !== category)
      );
    }
  }

  const displayedProjects = projects
    .filter(
      (project) =>
        selectedCategories.length === 0 ||
        selectedCategories.includes(project.category)
    )
    .filter(
      (project) =>
        project.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
        project.category
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase())
    )
    .map((project) => (
      <section key={project.id} className="project space-y-2">
        <div className="flex justify-center relative overflow-hidden group cursor-pointer border border-gray-300 dark:border-gray-600 rounded-xl">
          <img
            src={project.url}
            alt={project.name}
            className="w-full h-full object-cover"
          />
          <Link className="bg-black text-white absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full transition group-hover:translate-y-0">
            Link
          </Link>
        </div>
        <p className="font-semibold">{project.name}</p>
        <pre>{project.category}</pre>
      </section>
    ));

  return (
    <main className="min-h-screen mx-auto flex justify-center items-center flex-col gap-6 p-3">
      <h1 className="text-3xl font-semibold">Projects</h1>
      <section>
        <article className="relative">
          <input
            type="text"
            id="search"
            className="p-2 pl-9 bg-gray-50 border-gray-300 rounded-md focus:border-sky-500 dark:focus:border-sky-500 focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
            placeholder="Search projects..."
            onChange={handleSearch}
          />
          <AiOutlineSearch className="absolute left-3 bottom-1 -translate-y-1/2" />
        </article>
      </section>
      <section className="flex flex-col md:flex-row mx-auto container max-w-6xl">
        <article className="space-y-2 p-2 w-full max-w-[10rem]">
          <h2 className="text-xl font-semibold">Filters</h2>
          <h3 className="font-semibold">Category</h3>
          <aside id="projectsFilters-container">
            <div className="flex flex-row items-center">
              <input
                type="checkbox"
                id="React"
                className="check mr-1"
                onChange={handleCheckbox}
              />
              <label htmlFor="React">React</label>
            </div>
            <div className="flex flex-row items-center">
              <input
                type="checkbox"
                id="MERN"
                className="check mr-1"
                onChange={handleCheckbox}
              />
              <label htmlFor="MERN">MERN</label>
            </div>
            <div className="flex flex-row items-center">
              <input
                type="checkbox"
                id="JavaScript"
                className="check mr-1"
                onChange={handleCheckbox}
              />
              <label htmlFor="JavaScript">JavaScript</label>
            </div>
          </aside>
        </article>
        <article
          id="projects-wrapper"
          className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-content-center p-2"
        >
          {displayedProjects}
        </article>
      </section>
      <CallToAction />
    </main>
  );
}
