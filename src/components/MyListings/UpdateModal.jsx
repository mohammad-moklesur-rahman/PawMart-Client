import { useState, useRef } from "react";
import Swal from "sweetalert2";
import "animate.css";
import useAxiosProtect from "../../hooks/useAxiosProtect";

const UpdateModal = ({ p, onUpdated }) => {
  const modalRef = useRef(null);
  const protectAxios = useAxiosProtect();

  const [formData, setFormData] = useState({});

  const handelUpdate = (p) => {
    setFormData(p);
    modalRef.current.showModal();
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Do you want to update this product?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Update",
      denyButtonText: "Don't Update",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Call backend API to update product
          await protectAxios.put(`/products/update/${formData._id}`, formData);
          onUpdated?.(formData); // parent to update UI
          Swal.fire("Updated!", "Product updated successfully.", "success");
        } catch {
          Swal.fire("Error!", "Failed to update product.", "error");
        }
      } else if (result.isDenied) {
        Swal.fire("Changes not saved", "", "info");
      }
    });
    // Close modal
    modalRef.current.close();
  };

  return (
    <>
      {/* Open Modal Button */}
      <button
        className="btn btn-sm btn-primary"
        onClick={() => handelUpdate(p)}
      >
        Update
      </button>

      {/* Modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-base-200 p-6 rounded-2xl shadow-xl">
          <h2 className="text-center text-2xl text-accent font-bold py-4 animate__animated animate__pulse animate__infinite">
            Update Product
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label mb-1 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input outline-primary focus:border-secondary w-full"
                required
              />
            </div>

            <div>
              <label className="label mb-1 font-medium">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input outline-primary focus:border-secondary w-full bg-gray-100 cursor-not-allowed"
                readOnly
              />
            </div>

            <div>
              <label className="label mb-1 font-medium">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="input outline-primary focus:border-secondary w-full"
                required
              />
            </div>

            <div>
              <label className="label mb-1 font-medium">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="input outline-primary focus:border-secondary w-full"
              />
            </div>

            <div>
              <label className="label mb-1 font-medium">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="textarea outline-primary focus:border-secondary w-full"
                placeholder="Enter product description"
              ></textarea>
            </div>

            <div>
              <label className="label mb-1 font-medium">Image URL</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="input outline-primary focus:border-secondary w-full"
                placeholder="Paste image URL"
              />
            </div>

            <div>
              <label className="label mb-1 font-medium">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="input outline-primary focus:border-secondary w-full"
              />
            </div>

            <div>
              <label className="label mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input outline-primary focus:border-secondary w-full bg-gray-100 cursor-not-allowed"
                readOnly
              />
            </div>

            <div className="modal-action">
              <button
                type="submit"
                className="btn bg-secondary text-green-500 mt-2 mb-6 w-full"
              >
                Update Product
              </button>
            </div>
          </form>
        </div>

        {/* Close modal on backdrop click */}
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </>
  );
};

export default UpdateModal;
