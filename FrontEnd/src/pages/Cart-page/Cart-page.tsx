import { Button, Checkbox, Tooltip } from "antd";
import AdminPageLayoutNoSideBar from "../../packages/layouts/admin-page-layout/admin-no-sidebar";
import { BsTrash } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";
import { BsTicketPerforated } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { TbMessage } from "react-icons/tb";
import { nanoid } from "nanoid";
import { ICartPage, IProductCart } from "./Cart-page.types";

export default function CartPage() {
  const dataCart: ICartPage[] = [
    {
      idShop: nanoid(),
      ImageShop:
        "https://focusasiatravel.vn/wp-content/uploads/2021/04/trantuanviet-bavi-hanoi-1617326198.jpg",
      NameShop: "Hoàng Dược Sư",
      ProductCart: [
        {
          idProduct: nanoid(),
          title: "Cơ sở dữ liệu đại cương",
          price: 100000,
          numberLectures: 150, // số bài giảng
          level: "Tất cả các trình độ",
          discount: 2000,
          quantity: 1,
          image:
            "https://inkythuatso.com/uploads/thumbnails/800/2023/03/1-hinh-anh-ngay-moi-hanh-phuc-sieu-cute-inkythuatso-09-13-35-50.jpg",
        },
        {
          idProduct: nanoid(),
          title: "Tiếng việt lớp 1",
          price: 150000,
          numberLectures: 150, // số bài giảng
          level: "Lớp 1",
          discount: 20500,
          quantity: 1,
          image:
            "https://inkythuatso.com/uploads/thumbnails/800/2023/03/1-hinh-anh-ngay-moi-hanh-phuc-sieu-cute-inkythuatso-09-13-35-50.jpg",
        },
      ],
      VoucherShop: [],
    },
  ];
  return (
    <AdminPageLayoutNoSideBar>
      <div className="w-[76%] m-auto">
        <div className="flex items-center gap-5">
          <div className="text-[24px] font-bold pt-6 pb-4">
            Giỏ hàng của bạn
          </div>
          <Button className="translate-y-[6px] font-semibold">Sửa</Button>
        </div>
        <div className="flex gap-4">
          {/* phần danh sách sản phẩm trong giỏ hàng */}
          <div className="w-[65%] flex flex-col gap-4 mb-4">
            {dataCart?.map((item: ICartPage) => {
              return (
                <div
                  className="px-4 pt-3 pb-3 bg-white rounded-md boxShadow-couses"
                  key={item.idShop}>
                  <div className="flex items-center justify-between pb-3 border-b-[1px]">
                    <div className="flex items-center gap-5">
                      <Checkbox />
                      <div className="flex items-center gap-3 cursor-pointer">
                        <img
                          src={item.ImageShop}
                          alt=""
                          className="w-[30px] h-[30px] rounded-full object-cover"
                        />
                        <div className="font-bold">{item.NameShop}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 hover:bg-[#f2f3f4] cursor-pointer px-[6px] rounded py-[6px]">
                      <TbMessage size={18} />
                      <div className="text-[13px] font-bold ">
                        Chat với Shop
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-7 py-5">
                    {item.ProductCart.map((product: IProductCart) => {
                      return (
                        <div
                          className="flex justify-around gap-7"
                          key={product.idProduct}>
                          <div className="flex items-center gap-5">
                            <Checkbox />
                            <div className="flex gap-3">
                              <div className="w-[80px] h-[80px] object-cover ">
                                <img
                                  src={product.image}
                                  alt=""
                                  className="w-full h-full object-cover rounded-md"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="font-bold line-clamp-2 leading-[20px] text-[16px]">
                                  {product.title}
                                </div>
                                <div className="mt-1">
                                  <div className="text-[12px] text-[#6a6f73] leading-[18px] font-normal">
                                    {product.numberLectures} bài giảng
                                  </div>
                                  <div className="text-[12px] text-[#6a6f73] leading-[18px] font-normal">
                                    {product.level}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-end flex-1 pr-3">
                            <div className="font-bold"> {product.price}</div>
                            <div className="text-[12px] text-[#b7bbbf] font-normal line-through">
                              {product.discount}
                            </div>
                          </div>
                          <div className="flex gap-7 translate-y-2">
                            <Tooltip title={"Yêu thích"}>
                              <FaRegHeart
                                size={16}
                                className="cursor-pointer"
                              />
                            </Tooltip>
                            <Tooltip title={"Xóa"}>
                              <BsTrash size={16} className="cursor-pointer" />
                            </Tooltip>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="pt-3 border-t-[1px]">
                    <div className="flex items-center gap-3 ">
                      <BsTicketPerforated size={24} />
                      <div className="flex items-center gap-3">
                        <div className="font-medium text-[#0f1e29]">
                          Mã giảm giá của Shop
                        </div>
                        <IoIosArrowForward size={20} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* phần thanh toán */}
          <div className="flex-1 ">
            <div className="bg-white rounded-md sticky top-[80px] boxShadow-couses">
              <div className="flex items-center justify-between py-4 px-4 border-b-[1px]">
                <div className="flex items-center gap-3 ">
                  <BsTicketPerforated size={24} />
                  <div className="flex items-center gap-3">
                    <div className="font-medium text-[#0f1e29]">
                      Mã giảm giá của E-learning
                    </div>
                  </div>
                </div>
                <div className="underline text-[#0f62fe] font-medium cursor-pointer">
                  Chọn/nhập mã
                </div>
              </div>
              <div className="flex justify-between px-4 pt-4 pb-3">
                <div>Tạm tính (2 sản phẩm):</div>
                <div className="translate-y-[-2px]">
                  <div className="text-end font-bold text-[18px]">
                    49.880.000đ
                  </div>
                  <div className="flex gap-2 text-end">
                    <div>49.880.000đ</div>
                    <div>-0,3%</div>
                  </div>
                </div>
              </div>
              <div className="px-4 pb-4">
                <Button className="w-full h-[40px] font-bold bg-red-600 text-[#fff]">
                  Thanh Toán
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminPageLayoutNoSideBar>
  );
}
