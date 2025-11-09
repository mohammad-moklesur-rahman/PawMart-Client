import { useEffect, useState } from "react";
import useAuth from "../../hooks/UseAuth";
import AOS from "aos";
import "aos/dist/aos.css";

const AddItemForm = ({ currentUser }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    category: "Pets",
    price: "",
    location: "",
    description: "",
    image: "",
    email: user?.email || "",
    date: "",
  });

  // For Aos
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // If category is "Pets", price = 0
    if (name === "category" && value === "Pets") {
      setFormData({ ...formData, category: value, price: 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // send formData to backend or Firebase here
  };

  return (
    <div className="bg-secondary pb-20">
      <h2 data-aos="fade-right" className="text-center text-2xl text-accent font-bold py-8">Pet owners or shop owners can add new listings.</h2>
      <div className="max-w-2xl mx-auto bg-primary-content p-8 rounded-2xl shadow-md">
        <h2 className="text-[20px] text-accent font-semibold text-center mb-4">
          Add Product / Pet
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product/Pet Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text my-1">Product / Pet Name</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              className="input outline-primary focus:border-secondary w-full"
              required
            />
          </div>

          {/* Category */}
          <div className="form-control">
            <label className="label">
              <span className="label-text my-1">Category</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="select outline-primary focus:border-secondary border-0 w-full"
            >
              <option>Pets</option>
              <option>Food</option>
              <option>Accessories</option>
              <option>Care Products</option>
            </select>
          </div>

          {/* Price */}
          <div className="form-control">
            <label className="label">
              <span className="label-text my-1">Price</span>
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="input outline-primary focus:border-secondary w-full"
              min="0"
              disabled={formData.category === "Pets"}
            />
          </div>

          {/* Location */}
          <div className="form-control">
            <label className="label">
              <span className="label-text my-1">Location</span>
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
              className="input outline-primary focus:border-secondary w-full"
              required
            />
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text my-1">Description</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write short description..."
              className="textarea outline-primary focus:border-secondary w-full"
              rows="3"
              required
            ></textarea>
          </div>

          {/* Image URL */}
          <div className="form-control">
            <label className="label">
              <span className="label-text my-1">Image URL</span>
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter image link"
              className="input outline-primary focus:border-secondary w-full"
              required
            />
          </div>

          {/* Date */}
          <div className="form-control">
            <label className="label">
              <span className="label-text my-1">Pick-Up Date</span>
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input outline-primary focus:border-secondary w-full"
              required
            />
          </div>

          {/* Email (readonly) */}
          <div className="form-control">
            <label className="label">
              <span className="label-text my-1">Email</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="input outline-primary focus:border-secondary w-full bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Submit */}
          <button type="submit" className="btn bg-secondary text-green-500 w-full mt-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItemForm;
