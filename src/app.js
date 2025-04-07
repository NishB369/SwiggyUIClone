import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./Pages/Home";
import RestaurantMain from "./Pages/RestaurantMain";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import RestaurantList from "./Pages/RestaurantList";
import IndiviudalRestaurant from "./Pages/IndiviudalRestaurant";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./Pages/Cart";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/restaurants",
    element: <RestaurantMain />,
  },
  {
    path: "/categories/:restaurantListId",
    element: <RestaurantList />,
  },
  {
    path: "/restaurants/:restaurantId",
    element: <IndiviudalRestaurant />,
  },
]);

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <Provider store={appStore}>
    <RouterProvider router={appRouter} />
  </Provider>
);
