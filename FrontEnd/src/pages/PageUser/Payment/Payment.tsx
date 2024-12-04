import { useNavigate } from "react-router-dom";
import AdminPageLayoutNoSideBar from "../../../packages/layouts/admin-page-layout/admin-no-sidebar";

import { AiOutlineClose } from "react-icons/ai";
import { useAtomValue } from "jotai";
import { inforCourseArray, totalPriceAtom } from "./storePayment";
import { useEffect, useState } from "react";
import { useConfigAPI } from "../../../packages/api/config-api";
import { useQuery } from "@tanstack/react-query";
import SuccessModal from "../../../packages/ui/success/SuccessModal";

export default function Payment() {
  const nav = useNavigate();
  const infoCourseValue = useAtomValue(inforCourseArray);
  const api = useConfigAPI();
  const [isPaid, setIsPaid] = useState(false); // Quản lý trạng thái thanh toán

  const totalPrice = infoCourseValue.reduce(
    (total, item) => total + Number(item.course_price),
    0
  );
  console.log("infoCourseValue", infoCourseValue);
  const { data: Get_Profile, isLoading } = useQuery({
    queryKey: ["Get_Profile_User"],
    queryFn: async () => {
      const response = await api.Get_Profile_User();
      if (response.isSuccess) {
        return response.data;
      } else {
        console.error(response);
      }
    },
  });

  const linkPayment = `https://img.vietqr.io/image/VCCB-9021049666251-compact.png?amount=${totalPrice}&addInfo=${
    Get_Profile?.id + totalPrice
  }`;

  console.log("infoCourseValue", infoCourseValue);

  const checkPaid = async (price: number, content: any) => {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbz6NfNyWPhJ2h1XtIpUpyd6Brw9CFugORj_bBX84rhWUu0nX_3MC_vhoGuwMU-JwS_Y/exec"
      );
      const data = await response.json();
      const lastPaid = data.data[data.data.length - 1];
      const lastPrice = lastPaid["Giá trị"];
      const lastContent = lastPaid["Mô tả"];
      const sanitizedString = content.replace(/[^a-zA-Z0-9 ]/g, "");
      if (lastPrice >= price && lastContent.includes(sanitizedString)) {
        setIsPaid(true); // Đánh dấu thanh toán thành công
        await api.User_Courses_Create({
          user_id: Get_Profile?.id,
          course_id: infoCourseValue[0].course_id,
        });
      } else console.log("Thanh toán không thành công");
    } catch (err) {
      console.error("Error checking payment:", err);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      checkPaid(totalPrice, Get_Profile?.id);
    }, 5000); // Kiểm tra thanh toán mỗi 5 giây

    return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  }, [totalPrice, Get_Profile?.id]);

  return (
    <AdminPageLayoutNoSideBar>
      {isPaid && <SuccessModal />}{" "}
      {/* Hiển thị Modal khi thanh toán thành công */}
      <div className="w-[60%] m-auto relative py-5 rounded-lg bg-white boxShadow-couses mt-7">
        <div className="flex justify-center gap-5">
          <div className="border-dashed border-r-[1px] border-[#494949] pr-4">
            <div className="h-[250px] w-[250px]">
              <img
                src={linkPayment}
                alt="QR Code Payment"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="text-center py-1 font-bold">
              Vui lòng quét QR để thanh toán
            </div>
          </div>
          <div className="pl-4">
            <div className="text-center text-[20px] font-bold border-b-[1px] border-[#d0d0d0] pb-3">
              Thông tin sản phẩm
            </div>
            {infoCourseValue.map((e) => (
              <div
                key={e.course_id}
                className="flex justify-between gap-2 my-4 py-3 bg-[#857e7e] px-3 rounded-[6px]">
                <div className="flex gap-2">
                  <div className="h-[65px] w-[65px] rounded overflow-hidden">
                    <img
                      src={
                        e.course_image
                          ? e.course_image
                          : "https://via.placeholder.com/65"
                      }
                      alt="Course"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="line-clamp-2 font-bold w-[350px] h-[40px]">
                      {e.course_name}
                    </div>
                    <div className="text-[13px] mt-1 font-medium">
                      Mã khóa học: {e.course_id}
                    </div>
                  </div>
                </div>
                <div>{e.course_price}</div>
              </div>
            ))}

            <div className="flex items-center border-t-[1px] border-[#d0d0d0] px-4 py-2 justify-between">
              <div>Tổng:</div>
              <div>{totalPrice}</div>
            </div>
          </div>
        </div>
        <div
          className="absolute cursor-pointer top-[-8px] right-[-10px] h-[30px] w-[30px] border-[1px] flex justify-center items-center bg-[#ffff] rounded-full"
          onClick={() => nav(-1)}>
          <AiOutlineClose size={18} />
        </div>
      </div>
    </AdminPageLayoutNoSideBar>
  );
}
