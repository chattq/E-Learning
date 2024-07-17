import { Button, Checkbox, Tooltip } from "antd";
import AdminPageLayoutNoSideBar from "../../packages/layouts/admin-page-layout/admin-no-sidebar";
import { BsTrash } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";
import { BsTicketPerforated } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { TbMessage } from "react-icons/tb";
import { nanoid } from "nanoid";
import { ICartPage, ICourseCart, IVoucherShop } from "./Cart-page.types";
import { useRef, useState } from "react";
import { flatMap, sumBy } from "lodash";
import { PopupVoucher } from "./use-popup/popup-voucher";
import { useGetTime } from "../../packages/hooks/useGetTime";

export default function CartPage() {
  const { convertISO8601Full } = useGetTime();
  const initialCart: ICartPage[] = [
    {
      idShop: nanoid(),
      ImageShop:
        "https://focusasiatravel.vn/wp-content/uploads/2021/04/trantuanviet-bavi-hanoi-1617326198.jpg",
      NameShop: "Hoàng Dược Sư",
      isSelectedAll: false,
      FlagProductChoose: "0",
      CourseCart: [
        {
          IdCourse: nanoid(),
          CourseName: "Cơ sở dữ liệu đại cương",
          CoursePrice: 190000,
          CourseLectures: 150, // số bài giảng
          CourseLevel: "Tất cả các trình độ",
          CourseDiscount: 2000,
          CourseQty: 1,
          isSelected: false,
          CourseImage:
            "https://inkythuatso.com/uploads/thumbnails/800/2023/03/1-hinh-anh-ngay-moi-hanh-phuc-sieu-cute-inkythuatso-09-13-35-50.jpg",
        },
      ],
      VoucherShop: [],
    },
    {
      idShop: nanoid(),
      ImageShop:
        "https://focusasiatravel.vn/wp-content/uploads/2021/04/trantuanviet-bavi-hanoi-1617326198.jpg",
      NameShop: "Hoàng Dược Sư",
      isSelectedAll: false,
      FlagProductChoose: "0",
      CourseCart: [
        {
          IdCourse: nanoid(),
          CourseName: "Cơ sở dữ liệu đại cương",
          CoursePrice: 180000,
          CourseLectures: 150, // số bài giảng
          CourseLevel: "Tất cả các trình độ",
          CourseDiscount: 20700,
          CourseQty: 1,
          isSelected: false,
          CourseImage:
            "https://inkythuatso.com/uploads/thumbnails/800/2023/03/1-hinh-anh-ngay-moi-hanh-phuc-sieu-cute-inkythuatso-09-13-35-50.jpg",
        },
        {
          IdCourse: nanoid(),
          CourseName: "Nhập môn các phương pháp tối ưu",
          CoursePrice: 100000,
          CourseLectures: 150, // số bài giảng
          CourseLevel: "Tất cả các trình độ",
          CourseDiscount: 2000,
          CourseQty: 1,
          isSelected: false,
          CourseImage:
            "https://inkythuatso.com/uploads/thumbnails/800/2023/03/1-hinh-anh-ngay-moi-hanh-phuc-sieu-cute-inkythuatso-09-13-35-50.jpg",
        },
      ],
      VoucherShop: [
        {
          IdVoucher: nanoid(),
          VoucherCode: "VOUCHER100",
          VoucherName: "Giảm tối đa 20% tối đa 90000",
          VoucherDiscount: 0,
          VoucherStartDate: convertISO8601Full(new Date()),
          VoucherEndDate: convertISO8601Full(new Date()),
          VoucherRate: 20,
          VoucherMax: 90000,
        },
      ],
    },
  ];

  const [dataCart, setCart] = useState<ICartPage[]>(initialCart);
  const [previousShopId, setPreviousShopId] = useState<string | null>(null);
  const popupVoucherRef = useRef<any>(null);

  const handleClickProduct = (product: ICourseCart, e: any, idShop: string) => {
    const valueCheckProduct = e.target.checked;

    setCart((prevCart) =>
      prevCart.map((shop) => {
        if (shop.idShop === idShop) {
          const updatedCourseCart = shop.CourseCart.map((course) =>
            course.IdCourse === product.IdCourse
              ? { ...course, isSelected: valueCheckProduct }
              : course
          ); // check xem  course.IdCourse === product.IdCourse thì isSelected: valueCheckProduct

          const isAnyProductSelected = updatedCourseCart.some(
            (course) => course.isSelected
          ); // check xem nếu mà có course.isSelected= true thì trả về true

          return {
            ...shop,
            CourseCart: updatedCourseCart,
            isSelectedAll: updatedCourseCart.every(
              (course) => course.isSelected
            ),
            FlagProductChoose: isAnyProductSelected ? "1" : "0",
          };
        }

        if (shop.idShop === previousShopId) {
          return {
            ...shop,
            isSelectedAll: false,
            CourseCart: shop.CourseCart.map((course) => ({
              ...course,
              isSelected: false,
            })),
            FlagProductChoose: "0",
          };
        }

        return shop;
      })
    );

    setPreviousShopId(idShop);
  };
  const handleSelectedAll = (productAll: ICartPage, e: any) => {
    const valueCheckAll = e.target.checked;
    setCart((prevCart) =>
      prevCart.map((shop) => {
        if (shop.idShop === productAll.idShop) {
          return {
            ...shop,
            isSelectedAll: valueCheckAll,
            FlagProductChoose: valueCheckAll ? "1" : "0",
            CourseCart: shop.CourseCart.map((course) => ({
              ...course,
              isSelected: valueCheckAll,
            })),
          };
        }

        if (shop.idShop === previousShopId) {
          return {
            ...shop,
            isSelectedAll: false,
            CourseCart: shop.CourseCart.map((course) => ({
              ...course,
              isSelected: false,
            })),
          };
        }

        return shop;
      })
    );

    setPreviousShopId(productAll.idShop);
  };

  const handleClickVoucher = (voucher: IVoucherShop[]) => {
    popupVoucherRef.current?.showModal(voucher);
    console.log(173, voucher);
  };
  console.log(114, dataCart);
  return (
    <AdminPageLayoutNoSideBar>
      <div className="w-[76%] m-auto">
        <div className="flex items-center gap-5">
          <div className="text-[24px] font-bold pt-6 pb-4">
            Giỏ hàng của bạn
          </div>
          <Button className="translate-y-[6px] font-semibold">Sửa</Button>
        </div>
        <div className="flex flex-wrap gap-4">
          {/* phần danh sách sản phẩm trong giỏ hàng */}
          <div className="w-[65%] flex flex-col gap-4 mb-4">
            {dataCart?.map((item: ICartPage) => {
              return (
                <div
                  className="px-4 py-3 bg-white rounded-md boxShadow-couses"
                  key={item.idShop}>
                  <div className="flex items-center justify-between pb-3 border-b-[1px]">
                    <div className="flex items-center gap-5">
                      <Checkbox
                        checked={item.isSelectedAll}
                        onClick={(e) => handleSelectedAll(item, e)}
                      />
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
                  <div className="flex flex-col gap-5 py-5">
                    {item.CourseCart.map((product: ICourseCart) => {
                      return (
                        <div
                          className="flex justify-around gap-7"
                          key={product.IdCourse}>
                          <div className="flex items-center gap-5">
                            <Checkbox
                              checked={product.isSelected}
                              onClick={(e) =>
                                handleClickProduct(product, e, item.idShop)
                              }
                            />
                            <div className="flex gap-3">
                              <div className="w-[80px] h-[80px] object-cover ">
                                <img
                                  src={product.CourseImage}
                                  alt=""
                                  className="w-full h-full object-cover rounded-md"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="font-bold line-clamp-2 leading-[20px] text-[16px]">
                                  {product.CourseName}
                                </div>
                                <div className="mt-1">
                                  <div className="text-[12px] text-[#6a6f73] leading-[18px] font-normal">
                                    {product.CourseLectures} bài giảng
                                  </div>
                                  <div className="text-[12px] text-[#6a6f73] leading-[18px] font-normal">
                                    {product.CourseLevel}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-end flex-1 pr-3">
                            <div className="font-bold">
                              {product.CoursePrice}
                            </div>
                            <div className="text-[12px] text-[#b7bbbf] font-normal line-through">
                              {product.CourseDiscount}
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
                    <div
                      className="flex items-center gap-3 cursor-pointer hover:underline"
                      onClick={() => handleClickVoucher(item.VoucherShop)}>
                      <BsTicketPerforated size={24} />
                      <div className="flex items-center gap-3">
                        <div className="font-medium text-[#0f1e29]">
                          {`Mã giảm giá của Shop ${
                            item.VoucherShop.length > 0
                              ? `(${item.VoucherShop.length})`
                              : ""
                          }`}
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
              <div className="flex justify-between leading-[20px] px-4 pt-4 pb-3">
                <div>
                  {`Tạm tính ${
                    dataCart.filter(
                      (prod: ICartPage) => prod.FlagProductChoose === "1"
                    ).length > 0
                      ? "(" +
                        flatMap(
                          dataCart.filter(
                            (prod: ICartPage) => prod.FlagProductChoose === "1"
                          ),
                          "CourseCart"
                        ).filter(
                          (prod: ICourseCart) => prod.isSelected === true
                        ).length +
                        " sản phẩm):"
                      : ""
                  }`}
                </div>
                <div className="">
                  <div className="text-end font-bold text-[20px] text-[#ee2624]">
                    {sumBy(
                      flatMap(
                        dataCart.filter(
                          (prod: ICartPage) => prod.FlagProductChoose === "1"
                        ),
                        "CourseCart"
                      ).filter((prod: ICourseCart) => prod.isSelected === true),
                      "CoursePrice"
                    )}
                  </div>
                  {sumBy(
                    flatMap(
                      dataCart.filter(
                        (prod: ICartPage) => prod.FlagProductChoose === "1"
                      ),
                      "CourseCart"
                    ).filter((prod: ICourseCart) => prod.isSelected === true),
                    "CourseDiscount"
                  ) > 0 ? (
                    <div className="flex gap-2 text-end">
                      <div>
                        {sumBy(
                          flatMap(
                            dataCart.filter(
                              (prod: ICartPage) =>
                                prod.FlagProductChoose === "1"
                            ),
                            "CourseCart"
                          ).filter(
                            (prod: ICourseCart) => prod.isSelected === true
                          ),
                          "CourseDiscount"
                        )}
                      </div>
                      <div>-0,3%</div>
                    </div>
                  ) : null}
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
        <PopupVoucher ref={popupVoucherRef} />
      </div>
    </AdminPageLayoutNoSideBar>
  );
}
