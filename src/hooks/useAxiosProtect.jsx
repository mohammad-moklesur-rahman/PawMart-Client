import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const protectInstance = axios.create({
  baseURL: "https://pawmart-server-kappa.vercel.app/api",
});

const useAxiosProtect = () => {
  const { user, signOUt } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // * Request Interceptors
    const requestInterceptors = protectInstance.interceptors.request.use(
      (config) => {
        if (user?.accessToken) {
          config.headers.authorization = `Bearer ${user?.accessToken}`;
        }
        return config;
      }
    );

    // * Response Interceptors
    const responseInterceptors = protectInstance.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
          signOUt().then(() => {
            navigate("/register");
          });
        }
      }
    );

    return () => {
      protectInstance.interceptors.request.eject(requestInterceptors);
      protectInstance.interceptors.response.eject(responseInterceptors);
    };
  }, [user, signOUt, navigate]);

  return protectInstance;
};

export default useAxiosProtect;
