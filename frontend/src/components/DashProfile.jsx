import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutSuccess,
} from "../redux/user/userSlice";

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      const uploadImage = async () => {
        setImageFileUploading(true);
        setImageFileUploadError(null);

        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

            setImageFileUploadProgress(progress.toFixed(0));
          },
          (error) => {
            setImageFileUploadError(
              "Could not upload image. File must be less than 2MB.",
            );
            setImageFileUploadProgress(null);
            setImageFile(null);
            setImageFileUrl(null);
            setImageFileUploading(false);

            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageFileUrl(downloadURL);
              setFormData((prevFormData) => ({
                ...prevFormData,
                profilePicture: downloadURL,
              }));
              setImageFileUploading(false);
            });
          },
        );
      };

      uploadImage();
    }
  }, [imageFile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUpdateUserError(null);
    setUpdateUserSuccess(null);

    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made.");
      return;
    }

    if (imageFileUploading) {
      setUpdateUserError("Please wait for the image to upload.");
      return;
    }

    try {
      dispatch(updateStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully.");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);

    try {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className="mx-auto w-full max-w-lg p-3">
      <h1 className="my-7 text-center text-3xl font-semibold">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <article
          className="relative size-32 cursor-pointer self-center overflow-hidden rounded-full shadow-lg hover:opacity-90"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="User"
            className={`size-full rounded-full border-4 border-sky-500 bg-gray-300 object-cover dark:bg-gray-700 ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            }`}
          />
        </article>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        <input
          type="text"
          id="username"
          placeholder="Name"
          className="rounded-lg border-gray-300 bg-gray-50 p-2 shadow-lg focus:border-sky-500 focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:focus:border-sky-500"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          placeholder="email"
          className="rounded-lg border-gray-300 bg-gray-50 p-2 shadow-lg focus:border-sky-500 focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:focus:border-sky-500"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="rounded-lg border-gray-300 bg-gray-50 p-2 shadow-lg focus:border-sky-500 focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:focus:border-sky-500"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="rounded-lg border-2 border-sky-500 p-2 font-semibold text-sky-500 shadow-lg hover:bg-sky-500 hover:text-gray-100"
          disabled={loading || imageFileUploading}
        >
          {loading ? "Loading..." : "Update"}
        </button>
        {currentUser.isAdmin && (
          <Link
            className="w-full rounded-lg border-2 border-sky-500 bg-sky-500 p-2 text-center font-semibold text-gray-100 hover:bg-gray-100 hover:text-sky-500 dark:hover:bg-transparent"
            to="/create-post"
          >
            Create a post
          </Link>
        )}
      </form>
      <article className="mt-5 flex justify-between text-red-500">
        <span
          onClick={() => setShowModal(true)}
          className="cursor-pointer hover:opacity-80"
        >
          Delete Account
        </span>
        <span
          onClick={handleSignout}
          className="cursor-pointer hover:opacity-80"
        >
          Sign Out
        </span>
      </article>
      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color="failure" className="mt-5">
          {error}
        </Alert>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header className="rounded-t-md bg-gray-200" />
        <Modal.Body className="rounded-b-md bg-gray-200">
          <section className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 size-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your account?
            </h3>
            <aside className="flex justify-center gap-4">
              <button
                className="w-28 rounded-lg bg-red-500 p-2 text-gray-100 hover:opacity-85"
                onClick={handleDeleteUser}
              >
                Yes, I&apos;m sure
              </button>
              <button
                className="w-28 rounded-lg bg-gray-400 p-2 text-gray-100 hover:opacity-85"
                onClick={() => setShowModal(false)}
              >
                No, cancel
              </button>
            </aside>
          </section>
        </Modal.Body>
      </Modal>
    </section>
  );
}
