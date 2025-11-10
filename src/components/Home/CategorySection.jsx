import { useNavigate } from "react-router";
import MyContainer from "../MyContainer";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const categories = [
  { name: "Pets (Adoption)", icon: "🐾" },
  { name: "Pet Food", icon: "🍖" },
  { name: "Accessories", icon: "🎒" },
  { name: "Pet Care Products", icon: "🧴" },
];

const CategorySection = () => {
  const navigate = useNavigate();

  // * for Aos
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/category-filtered-product/${categoryName}`);
  };

  return (
    <div className="bg-secondary py-20">
      <MyContainer>
        <div>
          <h2 data-aos="fade-right" className="text-center text-2xl text-accent font-bold mb-10">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4">
            {categories.map((category) => (
              <div
                data-aos="fade-up"
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
                className="cursor-pointer bg-white shadow-md rounded-2xl p-6 flex flex-col items-center justify-center hover:shadow-lg hover:scale-105 transition-transform duration-200"
              >
                <span className="text-5xl mb-3">{category.icon}</span>
                <h3 className="text-lg font-semibold text-gray-800 text-center">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default CategorySection;
