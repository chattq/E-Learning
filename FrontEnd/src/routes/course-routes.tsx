import { RouteItem } from "../types";
import CourseOfflineDetail from "../pages/PageUser/Courses/course-offline/course-offline-detail/course-offline-detail";

export const courseRoutes: RouteItem[] = [
  {
    key: "course",
    path: "/course/detail/:courseId",
    mainMenuTitle: "",
    mainMenuKey: "course",
    permissionCode: "",
    getPageElement: () => <CourseOfflineDetail />,
  },
];
