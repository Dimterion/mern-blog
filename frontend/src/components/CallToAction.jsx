import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Placeholder title.</h2>
        <p className="text-gray-500 my-2">Placeholder text.</p>
        <Button
          gradientDuoTone="purpleToBlue"
          className="rounded-tl-xl rounded-bl-none rounded-tr-none"
        >
          <a
            href="http://dimterion.github.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Personal Page
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img
          src="https://raw.githubusercontent.com/Dimterion/MERN-stack/main/client/src/assets/images/overviewImg.jpg"
          alt="Placeholder image."
        />
      </div>
    </div>
  );
}
