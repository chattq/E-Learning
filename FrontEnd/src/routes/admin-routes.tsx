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
import AcountBank from "../pages/PageAdmin/AcountBank/AcountBank";
import { CiMoneyCheck1 } from "react-icons/ci";
import AdminDasboard from "../pages/PageAdmin/AdminDasboard/AdminDasboard";
import { FiTag } from "react-icons/fi";
import Mst_Voucher from "../pages/PageAdmin/Mst_Voucher/Mst_Voucher";
import Mst_Discount from "../pages/PageAdmin/Mst_Discount/Mst_Discount";
import Mst_FlashSale from "../pages/PageAdmin/Mst_FlashSale/Mst_FlashSale";
import Discount_Create from "../pages/PageAdmin/Mst_Discount/create/Discount_Create";
import BlogCreate from "../pages/Blog/BlogCreate";

export const adminRoutes: RouteItem[] = [
  {
    key: "AdminDasboard",
    path: "admin",
    mainMenuTitle: "",
    mainMenuKey: "AdminDasboard",
    permissionCode: "",
    getPageElement: () => <AdminDasboard />,
  },
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
    key: "CourseManager",
    path: "",
    mainMenuTitle: "Quản lý khóa học",
    icon: <ShoppingCartOutlined />,
    mainMenuKey: "CourseManager",
    permissionCode: "",
    children: [
      {
        key: "CourseManager",
        path: "admin/CourseManager",
        subMenuTitle: "Tất cả khóa học",
        mainMenuKey: "CourseManager",
        permissionCode: "",
        getPageElement: () => <ProductList />,
      },
      {
        key: "CourseCreate",
        path: "admin/CourseCreate",
        subMenuTitle: "Tạo khóa học",
        mainMenuKey: "CourseCreate",
        permissionCode: "",
        getPageElement: () => <CourseCreate />,
      },
      {
        key: "CourseCombo",
        path: "admin/CourseCombo",
        subMenuTitle: "Combo khóa học",
        mainMenuKey: "CourseCombo",
        permissionCode: "",
        getPageElement: () => <></>,
      },
    ],
  },
  {
    key: "category",
    path: "admin/category",
    mainMenuTitle: "Quản lý danh mục",
    icon: <ShoppingCartOutlined />,
    mainMenuKey: "category",
    permissionCode: "",
    getPageElement: () => <Ad_Category />,
  },
  {
    key: "accountBank",
    path: "admin/accountBank",
    mainMenuTitle: "Tài Chính",
    icon: <CiMoneyCheck1 size={20} />,
    mainMenuKey: "accountBank",
    permissionCode: "",
    getPageElement: () => <AcountBank />,
  },
  {
    key: "marketingManager",
    path: "",
    mainMenuTitle: "Kênh Marketing",
    icon: <FiTag />,
    mainMenuKey: "marketingManager",
    permissionCode: "",
    children: [
      {
        key: "vouchers",
        path: "admin/marketing/vouchers/list",
        subMenuTitle: "Mã Giảm Giá",
        mainMenuKey: "vouchers",
        permissionCode: "",
        getPageElement: () => <Mst_Voucher />,
      },
      {
        key: "discount",
        path: "admin/marketing/discount/list",
        subMenuTitle: "Khuyến mãi Của Shop",
        mainMenuKey: "discount",
        permissionCode: "",
        getPageElement: () => <Mst_Discount />,
      },
      {
        key: "discount",
        path: "admin/marketing/discount/create",
        subMenuTitle: "",
        mainMenuKey: "discount",
        permissionCode: "",
        getPageElement: () => <Discount_Create />,
      },
      {
        key: "shop-flash-sale",
        path: "admin/marketing/shop-flash-sale",
        subMenuTitle: "Flash Sale Của Shop",
        mainMenuKey: "shop-flash-sale",
        permissionCode: "",
        getPageElement: () => <Mst_FlashSale />,
      },
    ],
  },
];
