import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router";
import MyContainer from "../components/MyContainer";

const Login = () => {
  const [show, setShow] = useState(true);
  return (
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
                <form>
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
                      type="button"
                      className="btn bg-secondary text-green-500 mb-1"
                    >
                      <FcGoogle size={25} /> Login with Google
                    </button>
                    <p className="text-[13px]">
                      Don’t have an account?{" "}
                      <Link to="/register" className="text-pink-500 underline">
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
  );
};

export default Login;
