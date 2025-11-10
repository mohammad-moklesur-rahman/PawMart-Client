import CategorySection from "../components/Home/CategorySection";
import ContentSwiper from "../components/Home/ContentSwiper";
import LatestListings from "../components/Home/LatestListings";
import WhyAdoptSection from "../components/Home/WhyAdoptSection";

const Home = () => {
  return (
    <>
      {/* Banner Section */}
      <section>
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
    </>
  );
};

export default Home;
