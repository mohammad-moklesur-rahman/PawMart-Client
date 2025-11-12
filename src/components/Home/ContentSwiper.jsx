import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper/modules";
import { useRef } from "react";
import "animate.css";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import MyContainer from "../MyContainer";

const ContentSwiper = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  const [typewriter1] = useTypewriter({
    words: ["Find Your Furry Friend Today!"],
    loop: false,
  });
  const [typewriter2] = useTypewriter({
    words: ["Adopt, Don’t Shop — Give a Pet a Home."],
    loop: false,
  });
  const [typewriter3] = useTypewriter({
    words: ["Because Every Pet Deserves Love and Care."],
    loop: false,
  });

  return (
    <div className="h-[89vh]">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="bgImg1">
            <MyContainer>
              <div className="flex flex-col lg:flex-row lg:justify-between text-justify text-primary-content">
                <div className="w-2/2 lg:ml-20 mt-20 px-4 lg:px-0 lg:mt-60 text-[20px] font-bold text-green-500">
                  <span>{typewriter1}</span>
                  <Cursor cursorColor="#ff9292" />
                </div>
                <div
                  data-aos="fade-left"
                  className="mx-4 lg:mx-0 lg:ml-120 mt-8 lg:mt-40 animate__animated animate__pulse animate__infinite"
                >
                  <p>
                    The best friendships start with a furry paw. Bring home
                    happiness with a wagging tail and a loving heart. Your
                    perfect companion is waiting — find your furry friend now.
                  </p>
                </div>
              </div>
            </MyContainer>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="bgImg2">
            <MyContainer>
              <div className="flex flex-col lg:flex-row lg:justify-between text-justify text-primary-content">
                <div className="w-2/2 lg:ml-20 mt-20 px-4 lg:px-0 lg:mt-60 text-[20px] font-bold text-green-500">
                  <span>{typewriter2}</span>
                  <Cursor cursorColor="#ff9292" />
                </div>
                <div
                  data-aos="fade-left"
                  className="mx-4 lg:mx-0 lg:ml-120 mt-8 lg:mt-40 animate__animated animate__pulse animate__infinite"
                >
                  <p>
                    Adoption saves lives — be the hero a pet is waiting for.
                    Every adoption tells a story of love, rescue, and a new
                    beginning. Love can’t be bought, but it can be adopted.
                  </p>
                </div>
              </div>
            </MyContainer>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="bgImg3">
            <MyContainer>
              <div className="flex flex-col lg:flex-row lg:justify-between text-justify text-primary-content">
                <div className="w-2/2 lg:ml-20 mt-20 px-4 lg:px-0 lg:mt-60 text-[20px] font-bold text-green-500">
                  <span>{typewriter3}</span>
                  <Cursor cursorColor="#ff9292" />
                </div>
                <div
                  data-aos="fade-left"
                  className="mx-4 lg:mx-0 lg:ml-120 mt-8 lg:mt-40 animate__animated animate__pulse animate__infinite"
                >
                  <p>
                    Every pet deserves love, care, and a safe home. Give love,
                    gain loyalty — that’s the magic of pets. Because pets make
                    life brighter, one cuddle at a time.
                  </p>
                </div>
              </div>
            </MyContainer>
          </div>
        </SwiperSlide>

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  );
};

export default ContentSwiper;
