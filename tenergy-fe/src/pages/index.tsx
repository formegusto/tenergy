import { useRoutes } from "react-router-dom";
import { ApartmentPage } from "./apartment";
import { AuthPage } from "./auth";
import { MainPage } from "./main";
import { PublicPage } from "./public";
import { RootPage } from "./root";
import { TradingPage } from "./trading";

function Pages() {
  let pages = useRoutes([
    {
      path: "/",
      element: <RootPage />,
      children: [
        {
          index: true,
          element: <MainPage />,
        },
        {
          path: "/apartment",
          element: <ApartmentPage />,
        },
        {
          path: "/trading",
          element: <TradingPage />,
        },
        {
          path: "/public",
          element: <PublicPage />,
        },
        {
          path: "/auth",
          element: <AuthPage />,
        },
      ],
    },
  ]);

  return pages;
}

export default Pages;
