// import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
// import QuillEditor from "../components/QuillEditor";

export default function CreatePost() {
  // const quillRef = useRef();
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image.");

        return;
      }

      setImageUploadError(null);

      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed.");
          setImageUploadProgress(null);

          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        },
      );
    } catch (error) {
      setImageUploadError("Image upload failed.");
      setImageUploadProgress(null);

      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        setPublishError(data.message);

        return;
      }

      if (res.ok) {
        setPublishError(null);

        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong.");
    }
  };

  return (
    <main className="mx-auto mb-10 min-h-screen max-w-3xl p-3">
      <h1 className="mb-10 mt-7 text-center text-3xl font-semibold">
        Create a post
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="Title"
          required
          id="title"
          className="flex-1"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <section className="flex flex-col justify-between gap-4 sm:flex-row">
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="uncategorized">Select a category</option>
            <option value="project">Project</option>
            <option value="coding">Coding</option>
            <option value="thoughts">Thoughts</option>
          </Select>
          <TextInput
            type="text"
            placeholder="Link"
            id="link"
            className="flex-1"
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          />
        </section>
        <section className="flex items-center justify-between gap-4 rounded-lg border-2 border-dotted border-sky-500 p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            className="rounded-lg border-2 border-sky-500 px-4 py-2 text-sm font-semibold text-sky-500 hover:bg-sky-500 hover:text-gray-100"
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <aside className="size-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </aside>
            ) : (
              "Upload Image"
            )}
          </button>
        </section>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="h-72 w-full rounded-lg object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="mb-24 h-72 sm:mb-12"
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        {/* <QuillEditor
          ref={quillRef}
          onTextChange={() => {
            const htmlContent = quillRef.current.root.innerHTML;
            setFormData({ ...formData, content: htmlContent });
          }}
        /> */}
        <button
          type="submit"
          className="rounded-lg border-2 border-sky-500 px-4 py-2 font-semibold text-sky-500 hover:bg-sky-500 hover:text-gray-100"
        >
          Publish
        </button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </main>
  );
}
