import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <main className="text-center min-h-[70vh] flex flex-col justify-center gap-6">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <Link className="mx-auto" to="/">
        <Button gradientDuoTone="purpleToBlue" outline>
          Back to the Home page
        </Button>
      </Link>
    </main>
  );
}
