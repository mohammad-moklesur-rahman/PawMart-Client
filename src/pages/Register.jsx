import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import MyContainer from "../components/MyContainer";
import useAuth from "../hooks/UseAuth";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";

const Register = () => {
  const { signUpWithEmailAndPassWord, signInWithGoogle, setUser, user } =
    useAuth();
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  // * navigate previous path
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handelSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const displayName = form.name.value;
    const photoURL = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    // * Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must contain at least one uppercase, one lowercase letter, and be at least 6 characters long."
      );
      return;
    }

    // * Sign UP with Email and Password
    signUpWithEmailAndPassWord(email, password)
      .then((res) => {
        // * Update user Profile
        updateProfile(res.user, {
          displayName,
          photoURL,
        })
          .then(() => {
            toast.success("Signup successful 🎉");
            navigate(from, { replace: true });
          })
          .catch((error) => {
            if (error.code === "auth/requires-recent-login") {
              toast.error("Please sign in again before updating your profile.");
            } else if (error.code === "auth/network-request-failed") {
              toast.error("Network error. Check your internet connection.");
            } else if (error.code === "auth/invalid-photo-url") {
              toast.error("Invalid photo URL format.");
            } else {
              toast.error("Failed to update profile. Please try again.");
            }
          });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          toast.error("This email is already in use.");
        } else if (error.code === "auth/invalid-email") {
          toast.error("Invalid email format.");
        } else if (error.code === "auth/weak-password") {
          toast.error("Password should be at least 6 characters.");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      });
  };

  // * Login with Google
  const handelGoogleLogin = () => {
    signInWithGoogle()
      .then((res) => {
        setUser(res.user);
        toast.success("Signed in with Google successfully!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        if (error.code === "auth/popup-closed-by-user") {
          toast.warning("Sign-in popup closed before completing.");
        } else if (error.code === "auth/popup-blocked") {
          toast.error("Popup was blocked by the browser.");
        } else if (error.code === "auth/cancelled-popup-request") {
          toast.error("Another popup is already open.");
        } else if (error.code === "auth/network-request-failed") {
          toast.error("Network error. Check your internet connection.");
        } else if (error.code === "auth/unauthorized-domain") {
          toast.error("Unauthorized domain. Check Firebase settings.");
        } else if (error.code === "auth/internal-error") {
          toast.error("Internal error occurred. Try again later.");
        } else {
          toast.error("Google sign-in failed. Please try again.");
        }
      });
  };

  return (
    <>
      <div className=" bg-secondary">
        <MyContainer>
          <div className="grid lg:grid-cols-12 h-screen">
            <div className="hidden lg:col-span-7 authImg text-2xl lg:flex items-end text-white z-50"></div>
            <div className="lg:col-span-5 bg-gray-200">
              <div>
                <div className="flex justify-center pt-4">
                  <Link to="/">
                    <h2 className="text-[#FF9292] text-2xl font-semibold hover:scale-105">
                      <span className="text-green-500">P</span>aw
                      <span className="text-green-500">M</span>art
                    </h2>
                  </Link>
                </div>
                <div className="flex justify-center items-center h-[92vh]">
                  <form onSubmit={handelSignUp}>
                    <h2 className="text-[20px] font-semibold text-gray-700 text-center">
                      Register
                    </h2>

                    <fieldset className="fieldset rounded-box w-xs px-4 py-2 mb-4">
                      <label className="label">Name</label>
                      <input
                        required
                        type="text"
                        name="name"
                        className="input outline-primary focus:border-secondary"
                        placeholder="Enter Full Name"
                      />

                      <label className="label">Photo-URL</label>
                      <input
                        required
                        type="text"
                        name="photo"
                        className="input outline-primary focus:border-secondary"
                        placeholder="Enter Photo-URL"
                      />

                      <label className="label">Email</label>
                      <input
                        required
                        type="email"
                        name="email"
                        className="input outline-primary focus:border-secondary"
                        placeholder="Email"
                      />

                      <label className="label">Password</label>
                      <div className="relative">
                        <input
                          required
                          type={show ? "password" : "text"}
                          name="password"
                          className="input outline-primary focus:border-secondary"
                          placeholder="Password"
                        />
                        <div
                          onClick={() => setShow(!show)}
                          className="absolute top-[13px] right-2 z-20 cursor-pointer"
                        >
                          {show ? <FiEye /> : <FiEyeOff />}
                        </div>
                      </div>

                      <button className="btn bg-secondary text-green-500 mt-2">
                        Register
                      </button>
                      <div className="divider">OR</div>
                      <button
                        onClick={handelGoogleLogin}
                        type="button"
                        className="btn bg-secondary text-green-500 mb-1"
                      >
                        <FcGoogle size={25} /> Login with Google
                      </button>
                      <p className="text-[13px]">
                        Already have an account?{" "}
                        <Link to="/login" className="text-pink-500 underline">
                          Login here
                        </Link>
                      </p>
                    </fieldset>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </MyContainer>
      </div>
    </>
  );
};

export default Register;
