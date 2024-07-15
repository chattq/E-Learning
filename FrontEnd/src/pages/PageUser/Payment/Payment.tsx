import { useNavigate } from "react-router-dom";
import AdminPageLayoutNoSideBar from "../../../packages/layouts/admin-page-layout/admin-no-sidebar";

import { AiOutlineClose } from "react-icons/ai";

export default function Payment() {
  const nav = useNavigate();
  return (
    <AdminPageLayoutNoSideBar>
      <div className="w-[60%] m-auto relative py-5 rounded-lg bg-white boxShadow-couses mt-7">
        <div className="flex justify-center gap-5">
          <div className="border-dashed border-r-[1px] border-[#494949] pr-4">
            <div className="h-[250px] w-[250px]">
              <img
                src="https://apinganhang.com/wp-content/uploads/sites/10/2021/06/4128Nh_2021-06-15_Lu.jpeg"
                alt=""
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
            <div className="flex justify-between gap-2 my-4 py-3 bg-[#857e7e] px-3 rounded-[6px]">
              <div className="flex gap-2">
                <div className="h-[65px] w-[65px] rounded overflow-hidden">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo1gisKyspgqqqx7iDFDCDKyjZVpkYTCTRWw&s"
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="line-clamp-2 font-bold w-[350px] h-[40px]">
                    Backend RESTFul Server với Node.JS và Express (SQL/MongoDB)
                  </div>
                  <div className="text-[13px] mt-1 font-medium">
                    Mã khóa học: 88888ahsfalsfhasf
                  </div>
                </div>
              </div>
              <div>
                <div>8000000000đ</div>
                <div>8000000000đ</div>
              </div>
            </div>
            <div className="flex items-center border-t-[1px] border-[#d0d0d0] px-4 py-2 justify-between">
              <div className="">Tổng:</div>
              <div>8000000</div>
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
