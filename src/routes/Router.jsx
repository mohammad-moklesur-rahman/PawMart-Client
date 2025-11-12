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
import PrivateRoute from "./PrivateRoute";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <NotFound />,
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
        element: (
          <PrivateRoute>
            <ListingDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-listing",
        element: (
          <PrivateRoute>
            <AddListing />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-listings",
        element: (
          <PrivateRoute>
            <MyListings />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-orders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
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
