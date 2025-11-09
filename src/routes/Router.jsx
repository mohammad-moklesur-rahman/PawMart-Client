import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import PetsAndSupplies from "../pages/PetsAndSupplies";
import AddListing from "../pages/AddListing";
import MyListings from "../pages/MyListings";
import MyOrders from "../pages/MyOrders";
import Login from "../pages/Login";
import Register from "../pages/Register";

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
