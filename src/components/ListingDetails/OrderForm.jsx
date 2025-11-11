import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "animate.css";
import useAuth from "../../hooks/UseAuth";
import useAxios from "../../hooks/useAxios";

const OrderForm = ({ detailsInfo }) => {
  const modalRef = useRef(null);
  const { user } = useAuth();
  const axios = useAxios();

  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData({
      productId: detailsInfo?._id || "",
      productName: detailsInfo?.name || "",
      buyerName: user?.displayName || "",
      email: user?.email || "",
      quantity: detailsInfo?.category === "pet" ? 1 : 1,
      price: detailsInfo?.price || 0,
      address: "",
      phone: "",
      date: "",
      notes: "",
    });
  }, [detailsInfo, user]);
  console.log(detailsInfo?.price);
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      return updated;
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Do you want to confirm the order?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Confirm",
      denyButtonText: `Don't Confirm`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios.post("/orders", formData);

        Swal.fire("Confirmed successfully!", "", "success");

        // * Reset form data
        setFormData({
          productId: detailsInfo?._id || "",
          productName: detailsInfo?.name || "",
          buyerName: user?.displayName || "",
          email: user?.email || "",
          quantity: detailsInfo?.category === "pet" ? 1 : 1,
          price: detailsInfo?.price || 0,
          address: "",
          phone: "",
          date: "",
          notes: "",
        });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });

    // Close modal
    modalRef.current.close();
  };

  return (
    <>
      {/* Open Button */}
      <div className="flex justify-center my-6 pb-10">
        <button
          className="btn w-96 bg-secondary-content hover:bg-primary-content text-green-500 mt-2"
          onClick={() => modalRef.current.showModal()}
        >
          Adopt / Order Now
        </button>
      </div>

      {/* Modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-base-200 p-6 rounded-2xl shadow-xl">
          <h2 className="text-center text-2xl text-accent font-bold py-4 animate__animated animate__pulse animate__infinite">
            Place Your Order
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="label mb-1 font-medium">Product ID</label>
                <input
                  type="text"
                  name="productId"
                  value={formData.productId}
                  readOnly
                  className="input outline-primary focus:border-secondary w-full bg-gray-100"
                />
              </div>
              <div>
                <label className="label mb-1 font-medium">Product Name</label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  readOnly
                  className="input outline-primary focus:border-secondary w-full bg-gray-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="label mb-1 font-medium">Buyer Name</label>
                <input
                  type="text"
                  name="buyerName"
                  value={formData.buyerName}
                  readOnly
                  className="input outline-primary focus:border-secondary w-full bg-gray-100"
                />
              </div>
              <div>
                <label className="label mb-1 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  className="input outline-primary focus:border-secondary w-full bg-gray-100"
                />
              </div>
            </div>

            <div>
              <label className="label mb-1 font-medium">Quantity</label>
              <input
                type="number"
                name="quantity"
                min="1"
                value={formData.quantity}
                onChange={handleChange}
                readOnly={detailsInfo?.category === "Pets"}
                className={`input outline-primary focus:border-secondary w-full ${
                  detailsInfo?.category === "Pets"
                    ? "bg-gray-100 cursor-not-allowed"
                    : ""
                }`}
              />
            </div>

            <div>
              <label className="label mb-1 font-medium">Price</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                readOnly
                className="input outline-primary focus:border-secondary w-full bg-gray-100"
              />
            </div>

            <div>
              <label className="label mb-1 font-medium">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="textarea outline-primary focus:border-secondary w-full"
                placeholder="Enter your address"
                required
              ></textarea>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="label mb-1 font-medium">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input outline-primary focus:border-secondary w-full"
                  placeholder="+880..."
                  required
                />
              </div>
              <div>
                <label className="label mb-1 font-medium">Pick-up Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="input outline-primary focus:border-secondary w-full"
                  required
                />
              </div>
            </div>

            <div>
              <label className="label mb-1 font-medium">Additional Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="textarea outline-primary focus:border-secondary w-full"
                placeholder="Any special instructions?"
              ></textarea>
            </div>

            <div className="modal-action">
              <button
                type="submit"
                className="btn bg-secondary text-green-500 mt-2 mb-6 w-full"
              >
                Submit Order
              </button>
            </div>
          </form>
        </div>

        {/* Close on click outside */}
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </>
  );
};

export default OrderForm;
