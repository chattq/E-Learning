import React from "react";
import AdminPageLayout from "../../../packages/layouts/admin-page-layout/admin-page-layout";
import { BiLogoShopify } from "react-icons/bi";
import { FaGift } from "react-icons/fa6";
import { Button, Tabs, TabsProps } from "antd";
import "./Mst_Discount.scss";
import TabAll from "./components/TabAll";
import ShopProgram from "./components/ShopProgram";
import ComboSale from "./components/ComboSale";
import { useNavigate } from "react-router-dom";

export default function Mst_Discount() {
  const onChange = (key: string) => {
    console.log(key);
  };
  const nav = useNavigate();

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Tất cả",
      children: <TabAll />,
    },
    {
      key: "2",
      label: "Chương trình của shop",
      children: <ShopProgram />,
    },
    {
      key: "3",
      label: "Combo khuyến mãi",
      children: <ComboSale />,
    },
  ];
  return (
    <AdminPageLayout>
      <div className="px-4 py-4">
        <div className="bg-[#fff] rounded-md px-5 pt-4 pb-6 border-[1px]">
          <h1 className="text-[20px] font-bold mb-4">Tạo Khuyến Mãi</h1>
          <div className="flex grid-cols-2 items-center gap-5">
            <div className="border-[1px] pl-3 pr-4 pt-3 pb-4 w-[360px] rounded-md">
              <div className="flex items-center gap-2">
                <BiLogoShopify size={20} />
                <div className="font-semibold text-[15px]">
                  Chương Trình Của Shop
                </div>
              </div>
              <div className="pt-2 pb-3 font-medium text-[#999]">
                Tạo Chương trình của Shop để thiết lập các chương trình giảm giá
                sản phẩm
              </div>
              <div className="flex justify-end">
                <Button onClick={() => nav("/admin/marketing/discount/create")}>
                  Tạo
                </Button>
              </div>
            </div>
            <div className="border-[1px] pl-3 pr-4 pt-3 pb-4 w-[360px] rounded-md">
              <div className="flex items-center gap-2">
                <FaGift size={20} />
                <div className="font-semibold text-[15px]">
                  Combo khuyến mãi
                </div>
              </div>
              <div className="pt-2 pb-3 font-medium text-[#999]">
                Tạo Combo Khuyến Mãi để tăng giá trị đơn hàng trên mỗi Người mua
              </div>
              <div className="flex justify-end">
                <Button>Tạo</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#fff] mt-4 rounded-md px-5 pt-4 pb-6 border-[1px]">
          <Tabs
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
            className="Mst_Discount_Tabs"
          />
        </div>
      </div>
    </AdminPageLayout>
  );
}
