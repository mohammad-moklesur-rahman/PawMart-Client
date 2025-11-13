import { useEffect, useState } from "react";
import { useParams } from "react-router";
import MyContainer from "../components/MyContainer";
import AOS from "aos";
import "aos/dist/aos.css";
import AsideLatestProduct from "../components/ListingDetails/AsideLatestProduct";
import OrderForm from "../components/ListingDetails/OrderForm";
import LoadingSpinner from "../components/LoadingSpinner";
import useAxiosProtect from "../hooks/useAxiosProtect";

const ListingDetails = () => {
  const { id } = useParams();
  const protectAxios = useAxiosProtect();
  const [detailsInfo, setDetailsInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  // * for Aos
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  // * Listing details data
  useEffect(() => {
    setLoading(true);
    protectAxios
      .get(`/products/${id}`)
      .then((data) => {
        setDetailsInfo(data.data);
      })
      .finally(() => setLoading(false));
  }, [protectAxios, id]);

  const { name, image, category, email, location, price, description } =
    detailsInfo || {};

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-accent lg:bg-base-200">
      <MyContainer>
        <div className="bg-secondary grid lg:grid-cols-12 gap-12 lg:pl-6">
          {/* left area for details */}
          <div className="md:col-span-8">
            <div className="px-2 lg:px-0">
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
                <OrderForm detailsInfo={detailsInfo} />
              </div>
            </div>
          </div>

          {/* Right Aside */}
          <aside className="hidden lg:block bg-secondary-content col-span-4 pb-20 px-8">
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
