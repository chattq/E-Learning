import { RouteItem } from "../types";

import ProductList from "../pages/Mst_Product/Product_List/Product_List";
import BlogCreate from "../pages/Blog/BlogCreate";
import BlogDetail from "../pages/Blog/BlogDetail";

export const userRoutes: RouteItem[] = [
  {
    key: "users",
    path: "",
    mainMenuTitle: "",
    permissionCode: "",
    getPageElement: () => <ProductList />,
  },
  {
    key: "blog",
    path: "/blog/create",
    mainMenuTitle: "",
    permissionCode: "",
    getPageElement: () => <BlogCreate />,
  },
  {
    key: "blog",
    path: "/blog/blog-detail/:code",
    mainMenuTitle: "",
    permissionCode: "",
    getPageElement: () => <BlogDetail />,
  },
];
