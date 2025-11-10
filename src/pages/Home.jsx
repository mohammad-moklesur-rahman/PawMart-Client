import CategorySection from "../components/Home/CategorySection"
import ContentSwiper from "../components/Home/ContentSwiper"


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
    </>
  )
}

export default Home