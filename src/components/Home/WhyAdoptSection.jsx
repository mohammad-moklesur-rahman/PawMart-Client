import MyContainer from "../MyContainer";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const WhyAdoptSection = () => {
  const benefits = [
    {
      icon: "❤️",
      title: "Save a Life",
      description: "Provide a loving home to a rescued animal in need.",
    },
    {
      icon: "🌱",
      title: "Promote Responsible Pet Care",
      description: "Help fight pet overpopulation and unethical breeding.",
    },
    {
      icon: "🐾",
      title: "Get a Loving Companion",
      description: "Adopt a pet and gain a loyal friend for life.",
    },
  ];

  // * for Aos
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <div className="bg-primary-content pb-20">
      <MyContainer>
        <h2
          data-aos="fade-right"
          className="text-center text-2xl text-accent font-bold pt-12 pb-6"
        >
          Why Adopt from PawMart?
        </h2>
        <div data-aos="fade-up">
          <div className="max-w-5xl mx-auto text-center px-4">
            <p className="text-gray-700 text-lg mb-10">
              Every rescued pet deserves a loving home. By adopting from
              PawMart, you’re giving animals a second chance while supporting
              responsible pet care. Adopt, don’t shop!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
                >
                  <div className="text-5xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default WhyAdoptSection;
