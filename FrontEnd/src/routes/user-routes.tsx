import { ShoppingCartOutlined } from "@ant-design/icons";

import { RouteItem } from "../types";

import ProductList from "../pages/Mst_Product/Product_List/Product_List";

import Ad_Category from "../pages/PageAdmin/Ad_Category/Ad_Category";

import CourseCreate from "../pages/PageFounder/course-manager/course-create/course-create";
import CourseOnline from "../pages/PageUser/Courses/course-online/CourseOnline";
import CourseRoom from "../pages/PageUser/Courses/course-online/CourseRoom";
import ProfileUser from "../pages/PageUser/ProfileUser/ProfileUser";

export const userRoutes: RouteItem[] = [
  {
    key: "users",
    path: "",
    mainMenuTitle: "",
    permissionCode: "",
    getPageElement: () => <ProductList />,
  },
];
