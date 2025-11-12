import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/UseAuth";
import MyContainer from "../components/MyContainer";
import AOS from "aos";
import "aos/dist/aos.css";
import UpdateModal from "../components/MyListings/UpdateModal";
import Swal from "sweetalert2";
import LoadingSpinner from "../components/LoadingSpinner";

const MyListings = () => {
  const [myProducts, setMyProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const axios = useAxios();

  // * for Aos
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  // * My listings product
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/products/my-listings?email=${user.email}`)
      .then((res) => setMyProducts(res.data))
      .finally(() => setLoading(false));
  }, [axios, user.email]);

  // * Update product from Ui
  const handleProductUpdated = (updatedProduct) => {
    setMyProducts((prev) =>
      prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
    );
  };

  // * Delete product from UI
  const handleDeleteFromUI = (id) => {
    setMyProducts((prev) => prev.filter((p) => p._id !== id));
  };

  // * Delete product
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // * delete product
          await axios.delete(`/products/delete/${id}`);

          Swal.fire("Deleted!", "Product has been deleted.", "success");

          // Update UI
          handleDeleteFromUI(id);
        } catch {
          Swal.fire("Error!", "Failed to delete product.", "error");
        }
      }
    });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-secondary px-2 pb-20 pt-10">
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
                {myProducts.length > 0 ? (
                  myProducts.map((p, index) => (
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
                        <UpdateModal p={p} onUpdated={handleProductUpdated} />
                        <button
                          className="btn btn-sm btn-error"
                          onClick={() => handleDelete(p._id)}
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
