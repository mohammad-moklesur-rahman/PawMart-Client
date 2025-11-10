import { useState } from "react";
import MyContainer from "../MyContainer";
import useAxios from "../../hooks/useAxios";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const LatestListings = () => {
  const axios = useAxios();
  const [latestData, setLatestData] = useState([]);

  // * for Aos
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  useEffect(() => {
    axios.get("/products/latest").then((data) => {
      setLatestData(data.data);
    });
  }, [axios]);

  return (
    <div className="bg-secondary-content pb-20">
      <MyContainer>
        <h2
          data-aos="fade-right"
          className="text-center text-2xl text-accent font-bold py-10"
        >
          Latest listing products
        </h2>
        <div data-aos="fade-up">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestData.map((productInfo) => (
              <div
                key={productInfo._id}
                className="hover:scale-105 cursor-pointer transition-transform duration-200"
              >
                <div className="card bg-primary h-full shadow-sm">
                  <figure className="px-4 pt-4">
                    <img
                      src={productInfo.image}
                      alt={productInfo.category}
                      className="rounded-xl h-50 w-full"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title text-accent">
                      {productInfo.name}
                    </h2>
                    <p className="text-gray-800">
                      <span className="font-semibold">Category:</span>{" "}
                      {productInfo.category}
                    </p>
                    <p className="text-gray-800">
                      <span className="font-semibold ">Location:</span>{" "}
                      {productInfo.location}
                    </p>
                    <p className="text-gray-800">
                      <span className="font-semibold">Price:</span> $
                      {productInfo.price}
                    </p>
                    <div className="card-actions">
                      <button className="btn bg-secondary text-green-500 hover:bg-accent w-full">
                        See Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default LatestListings;
