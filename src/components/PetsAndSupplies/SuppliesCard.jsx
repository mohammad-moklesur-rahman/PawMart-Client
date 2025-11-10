import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import MyContainer from "../MyContainer";
import useAxios from "../../hooks/useAxios";

const SuppliesCard = () => {
  const axios = useAxios();
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("/products").then((data) => {
      setData(data.data);
    });
  }, [axios]);

  // * for Aos
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  // Generate unique categories dynamically
  const categories = ["All", ...new Set(data.map((p) => p.category))];

  // Filter products based on selected category
  const filteredData =
    selectedCategory === "All"
      ? data
      : data.filter((product) => product.category === selectedCategory);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  return (
    <MyContainer>
      <h2
        data-aos="fade-right"
        className="text-center text-2xl text-accent font-bold py-8"
      >
        All available listing products
      </h2>

      {/* Category Filter Dropdown */}
      <div className="mb-6 flex justify-center items-center gap-2">
        <h2 className="text-[18px] font-extrabold text-accent">
          Filter by category:
        </h2>
        <div className="relative w-42 sm:w-64">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="appearance-none w-full bg-primary-content border-0 rounded-lg py-3 px-4 pr-10 text-primary leading-tight focus:outline-none"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {/* Arrow icon */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5.516 7.548l4.484 4.484 4.484-4.484L15.484 9l-5 5-5-5z" />
            </svg>
          </div>
        </div>
      </div>

      {/* product Card */}
      {loading ? (
        <h2>Loadding....</h2>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredData.map((productInfo) => (
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
                  <p className="text-secondary">
                    <span className="font-semibold text-gray-800">
                      Category:
                    </span>{" "}
                    {productInfo.category}
                  </p>
                  <p className="text-secondary">
                    <span className="font-semibold text-gray-800">
                      Location:
                    </span>{" "}
                    {productInfo.location}
                  </p>
                  <p className="text-secondary">
                    <span className="font-semibold text-gray-800">Price:</span>{" "}
                    ${productInfo.price}
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
      )}
    </MyContainer>
  );
};

export default SuppliesCard;
