import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxios from "../hooks/useAxios";
import MyContainer from "../components/MyContainer";
import AOS from "aos";
import "aos/dist/aos.css";
import AsideLatestProduct from "../components/ListingDetails/AsideLatestProduct";
import OrderForm from "../components/ListingDetails/OrderForm";

const ListingDetails = () => {
  const { id } = useParams();
  const axios = useAxios();
  const [detailsInfo, setDetailsInfo] = useState([]);

  // * for Aos
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  // * Listing details data
  useEffect(() => {
    axios.get(`/products/${id}`).then((data) => {
      setDetailsInfo(data.data);
    });
  }, [axios, id]);

  const { name, image, category, email, location, price, description } =
    detailsInfo || {};

  return (
    <div className="bg-accent lg:bg-base-200">
      <MyContainer>
        <div className="bg-secondary grid grid-cols-12 gap-12 pl-6">
          {/* left area for details */}
          <div className="md:col-span-8">
            <div className="px-4 md:px-0">
              <h2
                data-aos="fade-right"
                className="text-2xl text-accent font-bold py-10"
              >
                {name}
              </h2>
              <div data-aos="fade-up">
                <figure>
                  <img className="w-full h-100" src={image} alt="" />
                </figure>
                <p className="text-gray-800 mt-6">
                  <span className="font-semibold">Category:</span> {category}
                </p>
                <p className="text-gray-800 my-2">
                  <span className="font-semibold">Owner’s Email:</span> {email}
                </p>
                <p className="text-gray-800">
                  <span className="font-semibold">Location:</span> {location}
                </p>
                <p className="text-gray-800 my-2">
                  <span className="font-semibold">Price:</span> ${price}
                </p>
                <p className="text-gray-800 mt-6 font-semibold">Description</p>
                <p className="text-gray-800 text-justify pt-2">{description}</p>

                {/* Order Form */}
                <OrderForm />
              </div>
            </div>
          </div>

          {/* Right Aside */}
          <aside className="bg-secondary-content col-span-4 pb-20 px-8">
            <h2
              data-aos="fade-left"
              className="text-center text-2xl text-accent font-bold py-10"
            >
              Latest listing products
            </h2>
            <div data-aos="fade-up" className="grid gap-8">
              <AsideLatestProduct />
            </div>
          </aside>
        </div>
      </MyContainer>
    </div>
  );
};

export default ListingDetails;
