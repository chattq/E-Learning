import {
  HomeOutlined,
  ScheduleOutlined,
  SnippetsOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { RouteItem } from "../types";
import BlogDetail from "../pages/Blog/BlogDetail";
import ProfileUser from "../pages/PageUser/ProfileUser/ProfileUser";
import { MyCourses } from "../pages/PageUser/MyCourses/MyCourses";
import BlogList from "../pages/Blog/BlogList";

export const siderbarRouters: RouteItem[] = [
  {
    key: "",
    path: "/",
    mainMenuTitle: "Trang chủ",
    permissionCode: "",
    icon: <HomeOutlined size={20} />,
  },
  {
    key: "profile",
    path: "/profile",
    mainMenuTitle: "Trang cá nhân",
    permissionCode: "",
    icon: <UserOutlined size={20} />,
    getPageElement: () => <ProfileUser />,
  },
  {
    key: "blog",
    path: "/blog",
    mainMenuTitle: "bài viết",
    permissionCode: "",
    icon: <SnippetsOutlined size={20} />,
    getPageElement: () => <BlogList />,
  },
  {
    key: "users_post3",
    path: "/my-course",
    mainMenuTitle: "Khóa học của tôi",
    permissionCode: "",
    icon: <SolutionOutlined size={20} />,
    getPageElement: () => <MyCourses />,
  },
  {
    key: "users_post4",
    path: "/events",
    mainMenuTitle: "Sự kiện",
    permissionCode: "",
    icon: <ScheduleOutlined size={20} />,
    getPageElement: () => <BlogList />,
  },
];
