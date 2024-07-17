import CartPage from "../pages/Cart-page/Cart-page";
import { RouteItem } from "../types";

export const productRoutes: RouteItem[] = [
  {
    key: "products",
    path: "/cart",
    mainMenuTitle: "",
    permissionCode: "",
    getPageElement: () => <CartPage />,
  },
];
