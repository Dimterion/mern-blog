import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { signInSuccess } from "../redux/user/userSlice";

export default function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        dispatch(signInSuccess(data));

        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      className="mx-auto flex w-full items-center justify-center rounded-lg border-2 border-sky-500 py-2 text-center text-sm font-bold text-sky-500 shadow-lg hover:bg-sky-500 hover:text-gray-200"
      onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle className="mr-2 size-5" /> Continue with Google
    </button>
  );
}
