import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxios from "../hooks/useAxios";
import MyContainer from "../components/MyContainer";
import LoadingSpinner from "../components/LoadingSpinner";

const CategoryFilteredProduct = () => {
  const { categoryName } = useParams();
  const axios = useAxios();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/products?category=${categoryName}`)
      .then((data) => {
        setFilteredProducts(data.data);
      })
      .finally(() => setLoading(false));
  }, [axios, categoryName]);

  if(loading) return <LoadingSpinner />

  return (
    <div className="bg-secondary pb-20">
      <MyContainer>
        <h2
          data-aos="fade-right"
          className="text-center text-2xl text-accent font-bold py-10"
        >
          {categoryName}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((productInfo) => (
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
        </div>
      </MyContainer>
    </div>
  );
};

export default CategoryFilteredProduct;
