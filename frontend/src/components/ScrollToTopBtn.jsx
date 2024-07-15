import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

function ScrollToTopBtn() {
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  function handleScroll() {
    setShowScrollBtn(window.scrollY > 0);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      className={`fixed bottom-10 lg:bottom-2 right-2 flex justify-center items-center z-10 size-6 bg-sky-500 text-gray-200 rounded-lg font-bold opacity-50 hover:opacity-100 ${
        showScrollBtn ? "block" : "hidden"
      }`}
      aria-label="Scroll to top"
      onClick={() => scrollToTop()}
    >
      <FaArrowUp />
    </button>
  );
}

export default ScrollToTopBtn;
