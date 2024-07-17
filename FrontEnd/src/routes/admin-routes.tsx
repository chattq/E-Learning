import { ShoppingCartOutlined } from "@ant-design/icons";
import TestAntd from "../pages/TestANTD/test-antd";
import { RouteItem } from "../types";
import DashBoardLayout from "../pages/DashBoardLayout/DashBoardLayout";
import ProductList from "../pages/Mst_Product/Product_List/Product_List";
import ProductAdd from "../pages/Mst_Product/Product_Add/Product_Add";
import Ad_Category from "../pages/PageAdmin/Ad_Category/Ad_Category";
import CourseManager from "../pages/PageFounder/course-manager/course-manager";
import CourseCreate from "../pages/PageFounder/course-manager/course-create/course-create";
import CourseOnline from "../pages/PageUser/Courses/course-online/CourseOnline";
import CourseRoom from "../pages/PageUser/Courses/course-online/CourseRoom";
import BlogList from "../pages/Blog/BlogList";
import BlogDetail from "../pages/Blog/BlogDetail";

export const adminRoutes: RouteItem[] = [
  {
    key: "productOrder",
    path: "",
    mainMenuTitle: "Quản lý lớp học",
    icon: <ShoppingCartOutlined />,
    mainMenuKey: "productOrder",
    permissionCode: "",
    children: [
      {
        key: "product1",
        path: "portal/productOrder/all",
        subMenuTitle: "Tất cả",
        mainMenuKey: "productOrder",
        permissionCode: "",
        getPageElement: () => <ProductList />,
      },
      {
        key: "product2",
        path: "portal/productOrder/cancel2",
        subMenuTitle: "Thêm bài tập",
        mainMenuKey: "productOrder1",
        permissionCode: "",
        getPageElement: () => <ProductList />,
      },
      {
        key: "product3",
        path: "portal/productOrder/cancel1",
        subMenuTitle: "Giao bài tập hàng loạt",
        mainMenuKey: "productOrder2",
        permissionCode: "",
        getPageElement: () => <ProductList />,
      },
    ],
  },
  {
    key: "product",
    path: "",
    mainMenuTitle: "Quản lý khóa học",
    icon: <ShoppingCartOutlined />,
    mainMenuKey: "product",
    permissionCode: "",
    children: [
      {
        key: "productAll",
        path: "portal/product/list/all",
        subMenuTitle: "Tất cả khóa học",
        mainMenuKey: "product",
        permissionCode: "",
        getPageElement: () => <ProductList />,
      },
      {
        key: "CourseManager",
        path: "portal/course/new",
        subMenuTitle: "Tạo khóa học",
        mainMenuKey: "CourseManager",
        permissionCode: "",
        getPageElement: () => <CourseCreate />,
      },
    ],
  },
  {
    key: "Admin_category",
    path: "",
    mainMenuTitle: "Tài Chính",
    icon: <ShoppingCartOutlined />,
    mainMenuKey: "category",
    permissionCode: "",
    children: [
      {
        key: "category",
        path: "admin/category",
        subMenuTitle: "Category",
        mainMenuKey: "category",
        permissionCode: "",
        getPageElement: () => <Ad_Category />,
      },
    ],
  },
  {
    key: "courses",
    path: "",
    mainMenuTitle: "Khóa học online",
    icon: <ShoppingCartOutlined />,
    mainMenuKey: "Course_online",
    permissionCode: "",
    children: [
      {
        key: "course_online",
        path: "admin/Course_online",
        subMenuTitle: "Khóa học online",
        mainMenuKey: "Course_online4",
        permissionCode: "",
        getPageElement: () => <CourseOnline />,
      },
      {
        key: "course_Room",
        path: "admin/Course_online/room/:id",
        subMenuTitle: "",
        mainMenuKey: "Course_online3",
        permissionCode: "",
        getPageElement: () => <CourseRoom />,
      },
    ],
  },
  {
    key: "blog",
    path: "",
    mainMenuTitle: "Quản lý blog",
    icon: <ShoppingCartOutlined />,
    mainMenuKey: "product",
    permissionCode: "",
    children: [
      {
        key: "blogAll",
        path: "/blog",
        subMenuTitle: "Blog",
        mainMenuKey: "bloglista",
        permissionCode: "",
        getPageElement: () => <BlogList />,
      },
      {
        key: "blogDetail",
        path: "blog/blog-detail",
        subMenuTitle: "BlogDetail",
        mainMenuKey: "blog-detail",
        permissionCode: "",
        getPageElement: () => <BlogDetail />,
      },
      // {
      //   key: "productNew",
      //   path: "portal/product/new",
      //   subMenuTitle: "Khuyến Mãi",
      //   mainMenuKey: "product",
      //   permissionCode: "",
      //   getPageElement: () => <ProductAdd />,
      // },
      // {
      //   key: "productNew",
      //   path: "portal/product/new",
      //   subMenuTitle: "Flash Sale",
      //   mainMenuKey: "product",
      //   permissionCode: "",
      //   getPageElement: () => <ProductAdd />,
      // },
      // {
      //   key: "productNew",
      //   path: "portal/product/new",
      //   subMenuTitle: "Mã Giảm Giá",
      //   mainMenuKey: "product",
      //   permissionCode: "",
      //   getPageElement: () => <ProductAdd />,
      // },
    ],
  },
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
