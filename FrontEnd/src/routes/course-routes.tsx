import { RouteItem } from "../types";
import CourseOfflineDetail from "../pages/PageUser/Courses/course-offline/course-offline-detail/course-offline-detail";
import Payment from "../pages/PageUser/Payment/Payment";
import CartPage from "../pages/Cart-page/Cart-page";
import CourseRoom from "../pages/PageUser/Courses/course-online/CourseRoom";
import Course_Offline_Room from "../pages/PageUser/Courses/course-offline/course-offline-room/course-offline-room";
import App from "../pages/TestANTD/test-antd";
import RoomWait from "../pages/PageUser/Courses/course-online/components/RoomWait";

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
    key: "Course_online",
    // path: "/admin/Course_online/room/20241405COURSEONLINE",
    path: "/admin/Course_online/room/:idCourse/:createby?",
    mainMenuTitle: "",
    mainMenuKey: "course",
    permissionCode: "",
    getPageElement: () => <RoomWait />,
  },

  {
    key: "course_offline",
    path: "/learning/course/:idCourse",
    mainMenuTitle: "",
    mainMenuKey: "course",
    permissionCode: "",
    getPageElement: () => <Course_Offline_Room />,
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
  {
    key: "test",
    path: "/testAntd",
    mainMenuTitle: "",
    mainMenuKey: "",
    permissionCode: "",
    getPageElement: () => <App />,
  },
];
