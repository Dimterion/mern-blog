import { Link } from "react-router-dom";
import { Footer } from "flowbite-react";
import {
  BsLinkedin,
  BsGithub,
  BsMedium,
  BsTwitterX,
  BsPersonVcardFill,
} from "react-icons/bs";

export default function FooterComponent() {
  return (
    <Footer container className="border-t-2 border-sky-500 rounded-none">
      <section className="w-full max-w-7xl mx-auto">
        <article className="grid justify-center sm:justify-between sm:flex md:grid-cols-1">
          <Link
            to="/"
            className="self-center text-lg sm:text-xl font-semibold mx-auto sm:mx-0 px-4 sm:px-6 py-1 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 rounded-tl-full rounded-br-full text-white"
          >
            Dimterion
          </Link>
          <aside className="grid grid-cols-2 mt-6 sm:mt-0 gap-16">
            <aside>
              <Footer.Title className="mb-4" title="Blog" />
              <Footer.LinkGroup col>
                <Footer.Link href="/">Home</Footer.Link>
                <Footer.Link href="/search">Posts</Footer.Link>
              </Footer.LinkGroup>
            </aside>
            <aside>
              <Footer.Title className="mb-4" title="Info" />
              <Footer.LinkGroup col>
                <Footer.Link href="/about">About</Footer.Link>
                <Footer.Link href="/projects">Projects</Footer.Link>
              </Footer.LinkGroup>
            </aside>
          </aside>
        </article>
        <hr className="my-4 dark:border-gray-500" />
        <article className="w-full flex flex-col-reverse sm:flex-row items-center sm:justify-between gap-4">
          <Footer.Copyright
            href="https://github.com/Dimterion/mern-blog"
            by="Dimterion"
            year={new Date().getFullYear()}
          />
          <aside className="flex gap-6 sm:justify-center">
            <Footer.Icon
              ariaLabel="Go to LinkedIn profile"
              href="https://www.linkedin.com/in/dmitrii-p/"
              target="_blank"
              rel="noopener noreferrer"
              icon={BsLinkedin}
              className="hover:opacity-90"
            />
            <Footer.Icon
              ariaLabel="Go to GitHub profile"
              href="https://github.com/Dimterion"
              target="_blank"
              rel="noopener noreferrer"
              icon={BsGithub}
              className="hover:opacity-90"
            />
            <Footer.Icon
              ariaLabel="Go to Medium blog"
              href="https://medium.com/@dimterion"
              target="_blank"
              rel="noopener noreferrer"
              icon={BsMedium}
              className="hover:opacity-90"
            />
            <Footer.Icon
              ariaLabel="Go to Twitter profile"
              href="https://twitter.com/Dimterion"
              target="_blank"
              rel="noopener noreferrer"
              icon={BsTwitterX}
              className="hover:opacity-90"
            />
            <Footer.Icon
              ariaLabel="Go to personal profile site"
              href="http://dimterion.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              icon={BsPersonVcardFill}
              className="hover:opacity-90"
            />
          </aside>
        </article>
      </section>
    </Footer>
  );
}
