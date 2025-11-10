import CategorySection from "../components/Home/CategorySection"
import ContentSwiper from "../components/Home/ContentSwiper"
import LatestListings from "../components/Home/LatestListings"


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
    </>
  )
}

export default Home