import Auth from "@/pages/Auth";
import Checkout from "@/pages/Checkout";
import Main from "@/pages/Main";
import Orders from "@/pages/Orders";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <Auth /> },
  { path: "/main", element: <Main /> },
  { path: "/checkout", element: <Checkout /> },
  { path: "/orders", element: <Orders /> },
]);

export default router;
