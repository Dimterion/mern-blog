import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsLinkedin,
  BsGithub,
  BsMedium,
  BsTwitterX,
  BsPersonVcardFill,
} from "react-icons/bs";

export default function FooterComponent() {
  return (
    <Footer container className="border border-t-8 border-sky-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 rounded-lg text-white">
                Dimterion&apos;s
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="http://dimterion.github.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Personal Page
                </Footer.Link>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Dimterion&apos;s Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow me" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/Dimterion"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Footer.Link>
                <Footer.Link
                  href="https://medium.com/@dimterion"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Medium
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="https://github.com/Dimterion/mern-blog"
            by="Dimterion's blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 mt-4 sm:justify-center">
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
          </div>
        </div>
      </div>
    </Footer>
  );
}
