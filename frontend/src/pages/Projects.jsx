import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import CallToAction from "../components/CallToAction";

export default function Projects() {
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
                id="reactProjects"
                className="check mr-1"
              />
              <label htmlFor="reactProjects">React</label>
            </div>
            <div className="flex flex-row items-center">
              <input type="checkbox" id="mernProjects" className="check mr-1" />
              <label htmlFor="mernProjects">MERN</label>
            </div>
            <div className="flex flex-row items-center">
              <input
                type="checkbox"
                id="javaScriptProjects"
                className="check mr-1"
              />
              <label htmlFor="javaScriptProjects">JavaScript</label>
            </div>
          </aside>
        </article>
        <article
          id="projects-wrapper"
          className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-content-center p-2"
        >
          <div className="project space-y-2">
            <div className="flex justify-center relative overflow-hidden group cursor-pointer border border-gray-300 dark:border-gray-600 rounded-xl">
              <img
                src="https://raw.githubusercontent.com/Dimterion/Notes-app/master/frontend/src/assets/home_page_img.jpg"
                alt="Project image"
                className="w-full h-full object-cover"
              />
              <Link className="projectBtn-status bg-black text-white absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full transition group-hover:translate-y-0">
                Link
              </Link>
            </div>
            <p className="font-semibold">React project</p>
            <pre>React</pre>
          </div>
          <div className="project space-y-2">
            <div className="flex justify-center relative overflow-hidden group cursor-pointer border border-gray-300 dark:border-gray-600 rounded-xl">
              <img
                src="https://raw.githubusercontent.com/Dimterion/Notes-app/master/frontend/src/assets/home_page_img.jpg"
                alt="Project image"
                className="w-full h-full object-cover"
              />
              <Link className="projectBtn-status bg-black text-white absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full transition group-hover:translate-y-0">
                Link
              </Link>
            </div>
            <p className="font-semibold">React project</p>
            <pre>React</pre>
          </div>
          <div className="project space-y-2">
            <div className="flex justify-center relative overflow-hidden group cursor-pointer border border-gray-300 dark:border-gray-600 rounded-xl">
              <img
                src="https://raw.githubusercontent.com/Dimterion/Notes-app/master/frontend/src/assets/home_page_img.jpg"
                alt="Project image"
                className="w-full h-full object-cover"
              />
              <Link className="projectBtn-status bg-black text-white absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full transition group-hover:translate-y-0">
                Link
              </Link>
            </div>
            <p className="font-semibold">React project</p>
            <pre>React</pre>
          </div>
        </article>
      </section>
      <CallToAction />
    </main>
  );
}
