import { ShoppingCartOutlined } from "@ant-design/icons";

import { RouteItem } from "../types";

import ProductList from "../pages/Mst_Product/Product_List/Product_List";

import Ad_Category from "../pages/PageAdmin/Ad_Category/Ad_Category";

import CourseCreate from "../pages/PageFounder/course-manager/course-create/course-create";
import CourseOnline from "../pages/PageUser/Courses/course-online/CourseOnline";
import CourseRoom from "../pages/PageUser/Courses/CourseRoom";

export const userRoutes: RouteItem[] = [
  {
    key: "users",
    path: "",
    mainMenuTitle: "",
    permissionCode: "",
    getPageElement: () => <ProductList />,
  },

  // {
  //   key: "product",
  //   path: "",
  //   mainMenuTitle: "Kênh Marketing",
  //   icon: <ShoppingCartOutlined />,
  //   mainMenuKey: "product",
  //   permissionCode: "",
  //   children: [
  //     {
  //       key: "productAll",
  //       path: "portal/product/list/all",
  //       subMenuTitle: "Quảng Cáo",
  //       mainMenuKey: "product",
  //       permissionCode: "",
  //       getPageElement: () => <ProductList />,
  //     },
  //     {
  //       key: "productNew",
  //       path: "portal/product/new",
  //       subMenuTitle: "Khuyến Mãi",
  //       mainMenuKey: "product",
  //       permissionCode: "",
  //       getPageElement: () => <ProductAdd />,
  //     },
  //     {
  //       key: "productNew",
  //       path: "portal/product/new",
  //       subMenuTitle: "Flash Sale",
  //       mainMenuKey: "product",
  //       permissionCode: "",
  //       getPageElement: () => <ProductAdd />,
  //     },
  //     {
  //       key: "productNew",
  //       path: "portal/product/new",
  //       subMenuTitle: "Mã Giảm Giá",
  //       mainMenuKey: "product",
  //       permissionCode: "",
  //       getPageElement: () => <ProductAdd />,
  //     },
  //   ],
  // },
  // {
  //   key: "categoryALL",
  //   path: "",
  //   mainMenuTitle: "Tài Chính",
  //   icon: <ShoppingCartOutlined />,
  //   mainMenuKey: "product",
  //   permissionCode: "",
  //   children: [
  //     {
  //       key: "productAll",
  //       path: "portal/product/list/all",
  //       subMenuTitle: "Doanh Thu",
  //       mainMenuKey: "product",
  //       permissionCode: "",
  //       getPageElement: () => <ProductList />,
  //     },
  //     {
  //       key: "productNew",
  //       path: "portal/product/new",
  //       subMenuTitle: "Số dư Tài Khoản",
  //       mainMenuKey: "product",
  //       permissionCode: "",
  //       getPageElement: () => <ProductAdd />,
  //     },
  //     {
  //       key: "productNew",
  //       path: "portal/product/new",
  //       subMenuTitle: "Tài Khoản Ngân Hàng",
  //       mainMenuKey: "product",
  //       permissionCode: "",
  //       getPageElement: () => <ProductAdd />,
  //     },
  //     {
  //       key: "category",
  //       path: "admin/category",
  //       subMenuTitle: "Category",
  //       mainMenuKey: "product",
  //       permissionCode: "",
  //       getPageElement: () => <Ad_Category />,
  //     },
  //   ],
  // },
];
