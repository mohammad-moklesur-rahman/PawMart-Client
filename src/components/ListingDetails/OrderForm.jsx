import { useState, useRef } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "animate.css";

const OrderForm = ({ user, product }) => {
  const modalRef = useRef(null);

  const [formData, setFormData] = useState({
    buyerName: user?.displayName || "",
    email: user?.email || "",
    productId: product?._id || "",
    productName: product?.name || "",
    quantity: product?.category === "pet" ? 1 : 1,
    price: product?.price || "",
    address: "",
    date: "",
    phone: "",
    notes: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you can send data to backend
    console.log("Order Data:", formData);

    // SweetAlert2 Toast
    Swal.fire({
      icon: "success",
      title: "Order placed successfully!",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
    });

    // Close modal
    modalRef.current.close();
  };

  return (
    <>
      {/* Open Button */}
      <div className="flex justify-center my-6">
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
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label font-medium">Buyer Name</label>
                <input
                  type="text"
                  name="buyerName"
                  value={formData.buyerName}
                  readOnly
                  className="input outline-primary focus:border-secondary w-full bg-gray-100"
                />
              </div>
              <div>
                <label className="label font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  className="input outline-primary focus:border-secondary w-full bg-gray-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label font-medium">Product ID</label>
                <input
                  type="text"
                  name="productId"
                  value={formData.productId}
                  readOnly
                  className="input outline-primary focus:border-secondary w-full bg-gray-100"
                />
              </div>
              <div>
                <label className="label font-medium">Product Name</label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  readOnly
                  className="input outline-primary focus:border-secondary w-full bg-gray-100"
                />
              </div>
            </div>

            {product?.category !== "pet" && (
              <div>
                <label className="label font-medium">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="input outline-primary focus:border-secondary w-full"
                />
              </div>
            )}

            <div>
              <label className="label font-medium">Price</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                readOnly
                className="input outline-primary focus:border-secondary w-full bg-gray-100"
              />
            </div>

            <div>
              <label className="label font-medium">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="textarea outline-primary focus:border-secondary w-full"
                placeholder="Enter your address"
                required
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label font-medium">Pick-up Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="input outline-primary focus:border-secondary w-full"
                  required
                />
              </div>
              <div>
                <label className="label font-medium">Phone</label>
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
            </div>

            <div>
              <label className="label font-medium">Additional Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="textarea outline-primary focus:border-secondary w-full"
                placeholder="Any special instructions?"
              ></textarea>
            </div>

            <div className="modal-action">
              <button type="submit" className="btn bg-secondary text-green-500 mt-2 mb-6 w-full">
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
