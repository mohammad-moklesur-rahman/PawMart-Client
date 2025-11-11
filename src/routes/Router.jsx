import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import PetsAndSupplies from "../pages/PetsAndSupplies";
import AddListing from "../pages/AddListing";
import MyListings from "../pages/MyListings";
import MyOrders from "../pages/MyOrders";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CategoryFilteredProduct from "../pages/CategoryFilteredProduct";
import ListingDetails from "../pages/ListingDetails";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/pets-and-supplies",
        Component: PetsAndSupplies,
      },
      {
        path: "/pets-and-supplies/listing-details/:id",
        element: <ListingDetails />,
      },
      {
        path: "/add-listing",
        element: <AddListing />,
      },
      {
        path: "/my-listings",
        element: <MyListings />,
      },
      {
        path: "/my-orders",
        element: <MyOrders />,
      },
      {
        path: "/category-filtered-product/:categoryName",
        Component: CategoryFilteredProduct,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
]);

export default router;
