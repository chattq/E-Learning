import { ShoppingCartOutlined } from "@ant-design/icons";
import TestAntd from "../pages/TestANTD/test-antd";
import { RouteItem } from "../types";
import DashBoardLayout from "../pages/DashBoardLayout/DashBoardLayout";
import ProductList from "../pages/Mst_Product/Product_List/Product_List";
import ProductAdd from "../pages/Mst_Product/Product_Add/Product_Add";

export const adminRoutes: RouteItem[] = [
  {
    key: "productOrder",
    path: "",
    mainMenuTitle: "Quản lý đơn hàng",
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
        subMenuTitle: "Đơn hủy",
        mainMenuKey: "productOrder",
        permissionCode: "",
        getPageElement: () => <ProductList />,
      },
    ],
  },
  {
    key: "product",
    path: "",
    mainMenuTitle: "Quản lý sản phẩm",
    icon: <ShoppingCartOutlined />,
    mainMenuKey: "product",
    permissionCode: "",
    children: [
      {
        key: "productAll",
        path: "portal/product/list/all",
        subMenuTitle: "Tất cả sản phẩm",
        mainMenuKey: "product",
        permissionCode: "",
        getPageElement: () => <ProductList />,
      },
      {
        key: "productNew",
        path: "portal/product/new",
        subMenuTitle: "Thêm sản phẩm",
        mainMenuKey: "product",
        permissionCode: "",
        getPageElement: () => <ProductAdd />,
      },
    ],
  },
];
