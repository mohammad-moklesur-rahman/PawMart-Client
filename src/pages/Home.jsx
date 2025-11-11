import { useEffect } from "react";
import CategorySection from "../components/Home/CategorySection";
import ContentSwiper from "../components/Home/ContentSwiper";
import LatestListings from "../components/Home/LatestListings";
import PetHeroes from "../components/Home/PetHeroes";
import WhyAdoptSection from "../components/Home/WhyAdoptSection";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  // * for Aos
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);
  return (
    <>
      {/* Banner Section */}
      <section data-aos="fade-up">
        <ContentSwiper />
      </section>

      {/* Category Section */}
      <section>
        <CategorySection />
      </section>

      {/* Show latest 6 listings product */}
      <section>
        <LatestListings />
      </section>

      {/* short awareness section / WhyAdoptSection */}
      <section>
        <WhyAdoptSection />
      </section>

      {/* Pet Heroes Section */}
      <section>
        <PetHeroes />
      </section>
    </>
  );
};

export default Home;
