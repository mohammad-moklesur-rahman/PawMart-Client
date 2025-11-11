import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/UseAuth";
import MyContainer from "../components/MyContainer";
import AOS from "aos";
import "aos/dist/aos.css";

const MyListings = () => {
  const [myData, setMyData] = useState([]);
  const { user } = useAuth();
  const axios = useAxios();

  // * for Aos
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  useEffect(() => {
    axios.get(`/products/my-listings?email=${user.email}`).then((date) => {
      setMyData(date.data);
    });
  }, [axios, user]);
  console.log(user.email);

  return (
    <div className="bg-secondary pb-20 pt-10">
      <h2
        data-aos="fade-right"
        className="text-center text-2xl text-accent font-bold pb-10"
      >
        My Listings
      </h2>
      <MyContainer>
        <div data-aos="fade-up" className="bg-primary-content">
          <div className="overflow-x-auto">
            <table className="table w-full border border-primary shadow-lg rounded-lg">
              <thead className="bg-primary text-accent uppercase text-sm md:text-base text-center">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Item</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>

              <tbody className="text-gray-700 text-sm md:text-base">
                {myData.length > 0 ? (
                  myData.map((p, index) => (
                    <tr
                      key={p._id}
                      className="hover:bg-gray-50 transition duration-150"
                    >
                      <th className="p-3">{index + 1}</th>
                      <td className="p-3 flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold">{p.name}</div>
                          <div className="text-xs md:text-sm text-gray-400">
                            {p.email}
                          </div>
                        </div>
                      </td>
                      <td className="p-3">{p.category}</td>
                      <td className="p-3">${p.price}</td>
                      <td className="p-3">{p.location}</td>
                      <td className="p-3">{p.date}</td>
                      <td className="p-3 flex flex-col md:flex-row gap-2 justify-center">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => alert(`Update product: ${p.name}`)}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-sm btn-error"
                          onClick={() => alert(`Delete product: ${p.name}`)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-4 text-center text-gray-500">
                      No products found for your account.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default MyListings;
