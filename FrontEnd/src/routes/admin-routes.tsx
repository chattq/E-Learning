import { ShoppingCartOutlined } from "@ant-design/icons";
import TestAntd from "../pages/TestANTD/test-antd";
import { RouteItem } from "../types";
import DashBoardLayout from "../pages/DashBoardLayout/DashBoardLayout";
import ProductList from "../pages/Mst_Product/Product_List/Product_List";
import ProductAdd from "../pages/Mst_Product/Product_Add/Product_Add";
import Ad_Category from "../pages/PageAdmin/Ad_Category/Ad_Category";

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
        key: "productOrderAll",
        path: "portal/productOrder/all",
        subMenuTitle: "Tất cả",
        mainMenuKey: "productOrder",
        permissionCode: "",
        getPageElement: () => <ProductList />,
      },
      {
        key: "productOrderAll",
        path: "portal/productOrder/cancel",
        subMenuTitle: "Thêm bài tập",
        mainMenuKey: "productOrder",
        permissionCode: "",
        getPageElement: () => <ProductList />,
      },
      {
        key: "productOrderAll",
        path: "portal/productOrder/cancel",
        subMenuTitle: "Giao bài tập hàng loạt",
        mainMenuKey: "productOrder",
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
        key: "productNew",
        path: "portal/product/new",
        subMenuTitle: "Tạo khóa học",
        mainMenuKey: "product",
        permissionCode: "",
        getPageElement: () => <ProductAdd />,
      },
    ],
  },
  {
    key: "product",
    path: "",
    mainMenuTitle: "Kênh Marketing",
    icon: <ShoppingCartOutlined />,
    mainMenuKey: "product",
    permissionCode: "",
    children: [
      {
        key: "productAll",
        path: "portal/product/list/all",
        subMenuTitle: "Quảng Cáo",
        mainMenuKey: "product",
        permissionCode: "",
        getPageElement: () => <ProductList />,
      },
      {
        key: "productNew",
        path: "portal/product/new",
        subMenuTitle: "Khuyến Mãi",
        mainMenuKey: "product",
        permissionCode: "",
        getPageElement: () => <ProductAdd />,
      },
      {
        key: "productNew",
        path: "portal/product/new",
        subMenuTitle: "Flash Sale",
        mainMenuKey: "product",
        permissionCode: "",
        getPageElement: () => <ProductAdd />,
      },
      {
        key: "productNew",
        path: "portal/product/new",
        subMenuTitle: "Mã Giảm Giá",
        mainMenuKey: "product",
        permissionCode: "",
        getPageElement: () => <ProductAdd />,
      },
    ],
  },
  {
    key: "product",
    path: "",
    mainMenuTitle: "Tài Chính",
    icon: <ShoppingCartOutlined />,
    mainMenuKey: "product",
    permissionCode: "",
    children: [
      {
        key: "productAll",
        path: "portal/product/list/all",
        subMenuTitle: "Doanh Thu",
        mainMenuKey: "product",
        permissionCode: "",
        getPageElement: () => <ProductList />,
      },
      {
        key: "productNew",
        path: "portal/product/new",
        subMenuTitle: "Số dư Tài Khoản",
        mainMenuKey: "product",
        permissionCode: "",
        getPageElement: () => <ProductAdd />,
      },
      {
        key: "productNew",
        path: "portal/product/new",
        subMenuTitle: "Tài Khoản Ngân Hàng",
        mainMenuKey: "product",
        permissionCode: "",
        getPageElement: () => <ProductAdd />,
      },
      {
        key: "productNew",
        path: "admin/category",
        subMenuTitle: "Category",
        mainMenuKey: "product",
        permissionCode: "",
        getPageElement: () => <Ad_Category />,
      },
    ],
  },
];
