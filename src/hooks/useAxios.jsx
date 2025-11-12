import axios from "axios";
import { useMemo } from "react";

const useAxios = () => {
  const instance = useMemo(() => {
    return axios.create({
      baseURL: "https://pawmart-server-kappa.vercel.app/api",
    });
  }, []);

  return instance;
};

export default useAxios;
