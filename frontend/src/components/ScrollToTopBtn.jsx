import { FaArrowUp } from "react-icons/fa6";

function ScrollToTopBtn() {
  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  return (
    <button
      className="fixed bottom-10 lg:bottom-2 right-2 flex justify-center items-center z-10 size-6 bg-sky-500 text-gray-200 rounded-full font-bold opacity-50 hover:opacity-100"
      onClick={() => scrollToTop()}
    >
      <FaArrowUp />
    </button>
  );
}

export default ScrollToTopBtn;
