import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAxios from "../../hooks/useAxios";

const AsideLatestProduct = () => {
  const axios = useAxios();
  const [latestData, setLatestData] = useState([]);
  const navigate = useNavigate();

  // * latest product
  useEffect(() => {
    axios.get("/products/latest").then((data) => {
      setLatestData(data.data);
    });
  }, [axios]);

  const sliceProduct = latestData.slice(0, 3);

  return (
    <>
      {sliceProduct.map((productInfo) => (
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
              <h2 className="card-title text-accent">{productInfo.name}</h2>
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
                <button
                  onClick={() =>
                    navigate(
                      `/pets-and-supplies/listing-details/${productInfo._id}`
                    )
                  }
                  className="btn bg-secondary text-green-500 hover:bg-accent w-full"
                >
                  See Details
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AsideLatestProduct;
