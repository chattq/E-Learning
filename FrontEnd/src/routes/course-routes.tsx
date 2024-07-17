import { RouteItem } from "../types";
import CourseOfflineDetail from "../pages/PageUser/Courses/course-offline/course-offline-detail/course-offline-detail";
import Payment from "../pages/PageUser/Payment/Payment";
import CartPage from "../pages/Cart-page/Cart-page";

export const courseRoutes: RouteItem[] = [
  {
    key: "course",
    path: "/course/detail/:courseId",
    mainMenuTitle: "",
    mainMenuKey: "course",
    permissionCode: "",
    getPageElement: () => <CourseOfflineDetail />,
  },
  {
    key: "payment",
    path: "/payment",
    mainMenuTitle: "",
    mainMenuKey: "course",
    permissionCode: "",
    getPageElement: () => <Payment />,
  },
  {
    key: "cart",
    path: "/cart",
    mainMenuTitle: "",
    mainMenuKey: "cart",
    permissionCode: "",
    getPageElement: () => <CartPage />,
  },
];
