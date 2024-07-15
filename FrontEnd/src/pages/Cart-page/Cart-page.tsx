import { Checkbox } from "antd";
import AdminPageLayoutNoSideBar from "../../packages/layouts/admin-page-layout/admin-no-sidebar";
import { BsTrash } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";

export default function CartPage() {
  return (
    <AdminPageLayoutNoSideBar>
      <div className="w-[75%] m-auto">
        <div>Giỏ hàng của bạn</div>
        <div className="flex gap-4">
          <div className="px-4 py-3 bg-white w-[70%] rounded-md">
            <div className="flex items-center justify-between pb-2 border-b-[1px]">
              <div className="flex items-center gap-5">
                <Checkbox />
                <div className="flex items-center gap-3">
                  <img
                    src="https://inkythuatso.com/uploads/thumbnails/800/2023/03/1-hinh-anh-ngay-moi-hanh-phuc-sieu-cute-inkythuatso-09-13-35-50.jpg"
                    alt=""
                    className="w-[30px] h-[30px] rounded-full object-cover"
                  />
                  <div className="font-bold">Hoàng Dược Sư</div>
                </div>
              </div>
              <div>Chat với shop</div>
            </div>
            <div className="flex justify-around gap-7 pt-3">
              <div className="flex items-center gap-5">
                <Checkbox />
                <div className="flex gap-3">
                  <div className="w-[80px] h-[80px] object-cover ">
                    <img
                      src="https://taoanhdep.com/wp-content/uploads/2023/10/ai-350x265.jpg"
                      alt=""
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold line-clamp-2 leading-[20px]">
                      In Ant Design (AntD), getting the value of a checkbox
                      typically involves using state management to track the
                      typically involves using state management to track the
                    </div>
                    <div className="">Hoàng Dược Sư</div>
                    <div className="">Hoàng Dược Sư</div>
                  </div>
                </div>
              </div>
              <div className="text-end">
                <div>800.000.000.000</div>
                <div>800.000</div>
              </div>
              <div className="flex gap-6">
                <FaRegHeart size={16} />
                <BsTrash size={16} />
              </div>
            </div>
          </div>
          <div className="bg-white flex-1 rounded-md">Tổng thanh toán</div>
        </div>
      </div>
    </AdminPageLayoutNoSideBar>
  );
}
