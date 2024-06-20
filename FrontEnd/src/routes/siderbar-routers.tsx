import {
  HomeOutlined,
  ScheduleOutlined,
  SnippetsOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { RouteItem } from "../types";
import BlogDetail from "../pages/Blog/BlogDetail";

export const siderbarRouters: RouteItem[] = [
  {
    key: "",
    path: "/",
    mainMenuTitle: "Trang chủ",
    permissionCode: "",
    icon: <HomeOutlined size={20} />,
  },
  {
    key: "users_post1",
    path: "/posts",
    mainMenuTitle: "Trang cá nhân",
    permissionCode: "",
    icon: <UserOutlined size={20} />,
  },
  {
    key: "blog",
    path: "/blog",
    mainMenuTitle: "bài viết",
    permissionCode: "",
    icon: <SnippetsOutlined size={20} />,
    getPageElement: () => <BlogDetail />,
  },
  {
    key: "users_post3",
    path: "/posts",
    mainMenuTitle: "Khóa học của tôi",
    permissionCode: "",
    icon: <SolutionOutlined size={20} />,
  },
  {
    key: "users_post4",
    path: "/posts",
    mainMenuTitle: "Sự kiện",
    permissionCode: "",
    icon: <ScheduleOutlined size={20} />,
  },
];
