import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
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

export default function UpdatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();

        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }

        if (res.ok) {
          setPublishError(null);
          setFormData(data.posts[0]);
        }
      };

      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);

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
        }
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
      const res = await fetch(
        `/api/post/updatepost/${formData._id}/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
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
    <main className="p-3 max-w-3xl mx-auto min-h-screen mb-10">
      <h1 className="text-center text-3xl mt-7 mb-10 font-semibold">
        Update a post
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="Title"
          required
          id="title"
          className="flex-1"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          value={formData.title || ""}
        />
        <section className="flex flex-col gap-4 sm:flex-row justify-between">
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category || ""}
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
            value={formData.link || ""}
          />
        </section>
        <section className="flex gap-4 items-center justify-between border-2 border-sky-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            className="border-2 border-sky-500 font-semibold text-sky-500 hover:text-gray-100 hover:bg-sky-500 rounded-lg px-4 py-2 text-sm"
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
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          value={formData.content || ""}
          placeholder="Write something..."
          className="h-72 mb-24 sm:mb-12"
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <button
          type="submit"
          className="border-2 border-sky-500 font-semibold text-sky-500 hover:text-gray-100 hover:bg-sky-500 rounded-lg px-4 py-2"
        >
          Update
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
