import MyContainer from "../MyContainer";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Marquee from "react-fast-marquee";

const PetHeroes = () => {
  const heroes = [
    {
      name: "Sarah Ahmed",
      role: "Pet Adopter",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      testimonial:
        "Adopting Max completely changed our lives. He was a rescued puppy in need of love, and bringing him home has brought so much joy, happiness, and laughter to our family. Every day, we are grateful for the second chance he got.",
    },
    {
      name: "Rafiq Hasan",
      role: "Pet Care Volunteer",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      testimonial:
        "Volunteering at PawMart has been an incredibly rewarding experience. Helping rescued pets find their forever homes gives me immense satisfaction, and knowing that these animals are now loved and cared for motivates me to continue dedicating my time to this cause.",
    },
    {
      name: "Nadia Karim",
      role: "Pet Adopter",
      image: "https://randomuser.me/api/portraits/women/52.jpg",
      testimonial:
        "I adopted Bella a few months ago, and she has completely transformed our household. She is full of energy, love, and affection. Seeing her grow healthy and happy makes me proud to be part of the adoption community and promotes responsible pet care.",
    },
    {
      name: "Jahid Khan",
      role: "Pet Care Volunteer",
      image: "https://randomuser.me/api/portraits/men/60.jpg",
      testimonial:
        "Working as a volunteer at PawMart has been one of the most meaningful experiences of my life. Rescuing animals, nurturing them, and helping them find permanent homes brings incredible joy, knowing that each pet now has a safe and loving environment to thrive in.",
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
    <div className="bg-secondary pb-20">
      <MyContainer>
        <h2
          data-aos="fade-right"
          className="text-center text-2xl text-accent font-bold py-10"
        >
          Meet Our Pet Heroes
        </h2>
        <Marquee speed={70} pauseOnHover>
          <div className="text-center px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {heroes.map((hero, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 w-96"
                >
                  <img
                    src={hero.image}
                    alt={hero.name}
                    className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold my-1">{hero.name}</h3>
                  <p className="text-green-500 font-medium mb-2">{hero.role}</p>
                  <p className="text-gray-600 text-sm text-justify">
                    {hero.testimonial}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Marquee>
      </MyContainer>
    </div>
  );
};

export default PetHeroes;
