import UserPageLayout from "../../../../../packages/layouts/user-page-layout/user-page-layout";
import { Button } from "antd";
import { BiFilm, BiSolidUser } from "react-icons/bi";
import { FaInfinity, FaUsers } from "react-icons/fa6";
import "./couse-offline-detail.scss";
import { useRef } from "react";
import { match } from "ts-pattern";
import { useNavigate, useParams } from "react-router-dom";
import { useSetAtom } from "jotai";
import { cartAtom } from "../../../../../packages/store/cart.store";
import { nanoid } from "nanoid";
import { useQuery } from "@tanstack/react-query";
import { useConfigAPI } from "../../../../../packages/api/config-api";
import {
  inforCourseArray,
  totalPriceAtom,
} from "../../../Payment/storePayment";

export default function CourseOfflineDetail() {
  const nav = useNavigate();
  const setDataAddCart = useSetAtom(cartAtom);
  const param = useParams();
  const api = useConfigAPI();
  const setPrice = useSetAtom(totalPriceAtom);
  const setInfoCoursePayment = useSetAtom(inforCourseArray);

  console.log("paramss", param.courseId);

  const { data: Course_Detail, isLoading } = useQuery({
    queryKey: ["Course_Detail"],
    queryFn: async () => {
      const response = await api.Course_GetAll();
      if (response.isSuccess) {
        return response.data;
      } else {
        console.log(response);
      }
    },
  });

  console.log("Course_Detail", Course_Detail);
  const handlePayment = () => {
    setInfoCoursePayment(Course_Detail ?? []);
    setPrice(Course_Detail?.[0]?.course_price);
    nav("/payment");
  };
  const handleAddCart = () => {
    setDataAddCart((prev: any) => [
      ...prev,
      {
        id: nanoid(),
        name: "React JS: Từ đầu đến nghiệp vụ",
        image: "https://iviet.vn/wp-content/uploads/2021/10/ElearningBooks.jpg",
        price: 100000,
        quantity: 1,
      },
    ]);
  };
  return (
    <UserPageLayout>
      <div>
        <div className="bg-[#212121d2] h-[358px]">
          <img
            src={
              Course_Detail?.[0]?.course_image
                ? Course_Detail?.[0]?.course_image
                : "https://iviet.vn/wp-content/uploads/2021/10/ElearningBooks.jpg"
            }
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="sticky top-[65px]">
          <div className="w-[80%] m-auto pt-9">
            <div className="flex gap-[20px]">
              <div className="flex-1">
                <h2>{Course_Detail?.[0]?.course_name}</h2>
                <div
                  id="course-objectives"
                  className="px-[24px] pb-[24px] pt-[15px] mb-[16px] rounded-[6px] box-shadow-card bg-[#fff] boxShadow-couses"
                >
                  {/* <div className="font-semibold text-[1.55rem] mb-[10px] text-[#1a1a1a]">
                    Bạn sẽ đạt được gì sau khi học khóa học?
                  </div>
                  <ul>
                    <li>
                      Có nền tảng ngữ pháp trung cấp, tương đương B1 ~ IELTS 4.0
                      để bắt đầu luyện IELTS
                    </li>
                    <li>
                      Nắm vững các chủ điểm ngữ pháp quan trọng trong IELTS
                      Writing
                    </li>
                    <li>
                      Xây dựng vốn từ vựng học thuật, làm nền móng để đọc/nghe
                      hiểu các chủ điểm chắc chắn sẽ xuất hiện trong 2 phần thi
                      Listening và Reading
                    </li>
                  </ul>
                </div> */}

                  <div id="course-information" className="mt-[40px]">
                    <div className="font-semibold text-[1.55rem] text-[#1a1a1a] mb-[1rem]">
                      Thông tin khóa học
                    </div>
                    <div className="p-[24px] mb-[16px] rounded-[6px] boxShadow-couses bg-[#fff]">
                      <div>{Course_Detail?.[0]?.course_over_view}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[380px]"></div>
            </div>
          </div>
        </div>
        <div className="fixed top-[90px] h-[600px] couser-sidebar w-[380px] right-[9.5%] bg-[#ffff] z-30">
          <div className="overflow-auto rounded-t-[0.65rem] h-[230px] w-full">
            <img
              src="https://service.keyframe.vn/uploads/filecloud/2018/April/25/72-559201524659628-1524659628.jpg"
              alt=""
              className="h-full w-full"
            />
          </div>
          <div className="px-4">
            <div className="flex gap-2 items-center py-4">
              <div className="text-[1.85rem] font-bold text-[#3cb46e] truncate flex-1">
                {Course_Detail?.[0]?.course_type == "free"
                  ? "0đ"
                  : Course_Detail?.[0]?.course_price}
              </div>
              {/* <div className="flex flex-col gap-1">
                <div className="text-[0.85rem] font-medium text-[#677788] flex items-center gap-1">
                  <div>Giá gốc:</div>
                  <div className="line-through truncate flex-1">1.099.000đ</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-[0.85rem] text-[#ec8f8f] font-normal flex gap-1 items-center">
                    <div className="">Tiết kiệm:</div>
                    <div className="truncate flex-1">1.000.000đ</div>
                  </div>
                  <div>
                    <span className="text-[12px] rounded-sm bg-[#ec8f8f] text-[#ffff] px-1 py-[2px]">
                      -20%
                    </span>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="flex flex-col gap-3 mt-3">
              <Button
                onClick={handleAddCart}
                className="bg-[#71869d hover:bg-[#82a5b0] button-couse-add-cart w-full text-[#b1b1b1] font-bold h-[40px] border-[1px] border-[#71869d] "
              >
                Thêm vào giỏ hàng
              </Button>
              <Button
                className="bg-[#9a2424] w-full text-[#fff] font-bold h-[40px]"
                onClick={handlePayment}
              >
                Mua ngay
              </Button>
            </div>
            <div>
              <div className="flex flex-col gap-3 border-t-[1px] border-b-[1px] mt-4 py-3">
                <div className="flex items-center gap-3">
                  <BiSolidUser size={20} />
                  <p>{Course_Detail?.[0]?.course_create_by}</p>
                </div>
                <div className="flex items-center gap-3">
                  <BiFilm size={20} />
                  <p>Tổng số 12 bài học</p>
                </div>
                <div className="flex items-center gap-3">
                  <FaInfinity size={20} />
                  <p>Quyền truy cập đầy đủ suốt đời</p>
                </div>
                <div className="flex items-center gap-3">
                  <FaUsers size={20} />
                  <p>123456789</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserPageLayout>
  );
}
