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
            className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white mx-auto sm:mx-0"
          >
            <span className="p-1 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 rounded-lg text-white">
              Dimterion&apos;s
            </span>
            <span>site</span>
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
              href="https://www.linkedin.com/in/dmitrii-p/"
              target="_blank"
              rel="noopener noreferrer"
              icon={BsLinkedin}
            />
            <Footer.Icon
              href="https://github.com/Dimterion"
              target="_blank"
              rel="noopener noreferrer"
              icon={BsGithub}
            />
            <Footer.Icon
              href="https://medium.com/@dimterion"
              target="_blank"
              rel="noopener noreferrer"
              icon={BsMedium}
            />
            <Footer.Icon
              href="https://twitter.com/Dimterion"
              target="_blank"
              rel="noopener noreferrer"
              icon={BsTwitterX}
            />
            <Footer.Icon
              href="http://dimterion.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              icon={BsPersonVcardFill}
            />
          </aside>
        </article>
      </section>
    </Footer>
  );
}
