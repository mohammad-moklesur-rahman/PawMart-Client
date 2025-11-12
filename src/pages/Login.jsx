import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import MyContainer from "../components/MyContainer";
import useAuth from "../hooks/UseAuth";
import toast from "react-hot-toast";

const Login = () => {
  const { loginWithEmailAndPassword, signInWithGoogle, setUser, user } =
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
  }, [user, from, navigate]);

  const handelLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // * Login with Email and Password
    loginWithEmailAndPassword(email, password)
      .then((res) => {
        setUser(res.user);
        toast.success("Login successful 🎉");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          toast.error("Invalid email format.");
        } else if (error.code === "auth/user-not-found") {
          toast.error("No account found with this email.");
        } else if (error.code === "auth/wrong-password") {
          toast.error("Incorrect password. Try again.");
        } else if (error.code === "auth/too-many-requests") {
          toast.error("Too many attempts. Please try later.");
        } else if (error.code === "auth/user-disabled") {
          toast.error("This user account has been disabled.");
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
                  <form onSubmit={handelLogin}>
                    <h2 className="text-[20px] font-semibold text-gray-700 text-center">
                      Login
                    </h2>

                    <fieldset className="fieldset rounded-box w-xs px-4 py-2 mb-4">
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
                        Login
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
                        Don’t have an account?{" "}
                        <Link
                          to="/register"
                          className="text-pink-500 underline"
                        >
                          Register here
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

export default Login;
