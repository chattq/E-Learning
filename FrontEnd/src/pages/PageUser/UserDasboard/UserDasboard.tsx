import UserPageLayout from "../../../packages/layouts/user-page-layout/user-page-layout";
import { Card, Rate } from "antd";
import "./UserDasboard.scss";
import StarRatings from "react-star-ratings";
import { useNavigate } from "react-router-dom";
import { useConvertNumber } from "../../../packages/hooks/useConvertNumber";
import { nanoid } from "nanoid";
import { match } from "ts-pattern";
import { RightOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";

import {
  Button,
  Modal,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { PopupSettingMedia } from "./use-popup/popup-setting-media";

export default function UserDasboard() {
  const popupSettingMediaRef = useRef<any>();
  const nav = useNavigate();

  const { convertMoneyVND } = useConvertNumber();
  const handleClickCourse = (item: any) => {
    if (item.courseType === "Online") {
      popupSettingMediaRef.current.showPopup();
    } else {
      nav(`/course/detail/${item.id}`);
    }
  };
  const dataCourse = [
    {
      id: nanoid(),
      image:
        "https://scr.vn/wp-content/uploads/2020/10/Anh-meo-cute-dang-yeu-de-thuong.jpg",
      title: "The Complete Python Bootcamp From Zero to Hero in Python",
      author: "Quang",
      price: 1000000,
      status: "Best_Seller",
      discount: 200000,
      courseType: "Online",
    },
    {
      id: nanoid(),
      image:
        "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2020/03/hoa-sung-mua-nuoc-noi.jpg",
      title: "The Complete Python Bootcamp From Zero to Hero in Python",
      author: "Quang",
      price: 1000000,
      status: "New",
      discount: 200000,
      courseType: "Video",
    },
    {
      id: nanoid(),
      image:
        "https://img1.kienthucvui.vn/uploads/2019/07/19/hinh-anh-lang-bac-ho-o-ha-noi_112812656.jpg",
      title: "The Complete Python Bootcamp From Zero to Hero in Python",
      author: "Quang",
      price: 1000000,
      status: "Highest_Rating",
      discount: 200000,
      courseType: "Video",
    },
    {
      id: nanoid(),
      image:
        "https://img4.thuthuatphanmem.vn/uploads/2020/05/13/hinh-anh-4k-anime_062425625.jpg",
      title: "The Complete Python Bootcamp From Zero to Hero in Python",
      author: "Quang",
      price: 1000000,
      status: "Trending&New",
      discount: 200000,
      courseType: "Video",
    },
    {
      id: nanoid(),
      image:
        "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/anh-meme-meo-cute-de-thuong.jpg",
      title: "The Complete Python Bootcamp From Zero to Hero in Python",
      author: "Quang",
      price: 1000000,
      status: "Trending&New",
      discount: 200000,
      courseType: "Video",
    },
  ];

  return (
    <UserPageLayout>
      <div className="px-4 py-4">
        <div className="bg-[#fff] rounded-md border-[0.5px]">
          <div className="flex justify-between items-center py-2 border-b-[0.5px] px-5">
            <div className="text-[18px] uppercase font-semibold">
              Đề xuất dành cho bạn
            </div>
            <div className="font-medium hover:underline cursor-pointer">
              Xem thêm <RightOutlined />
            </div>
          </div>
          <div className="grid xl:grid-cols-5 lg:grid-cols-4 lg:gap-3 md:grid-cols-3 md:gap-4 md:px-4 md:py-4 sm:grid-cols-2 px-5 py-5 xl:gap-5 gap-5">
            {dataCourse.map((item: any) => {
              return (
                <React.Fragment key={nanoid()}>
                  <Card
                    onClick={() => handleClickCourse(item)}
                    className="Card_Container cursor-pointer"
                    cover={
                      <img
                        className="h-[165px] object-cover"
                        alt="example"
                        src={item.image}
                      />
                    }>
                    <div>
                      <div className="font-bold text-[16px] line-clamp-2 leading-[20px]">
                        {item.title}
                      </div>
                      <div className="text-[13px] py-[1px]">{item.author}</div>
                      <div className="flex items-center gap-2 pt-[4px]">
                        <div className="text-[13px] rounded-sm font-bold bg-[#3eceb9] text-[#ffff] px-1">
                          {item.courseType}
                        </div>
                        {item.status ? (
                          <>
                            {match(item.status)
                              .with("New", () => {
                                return (
                                  <div className="text-[13px] line-clamp-1 rounded-sm font-bold bg-[#24e75b] px-2">
                                    Mới
                                  </div>
                                );
                              })
                              .with("Trending&New", () => {
                                return (
                                  <div className="text-[13px] line-clamp-1 rounded-sm font-bold bg-[#f3ca8c] px-2">
                                    Thịnh hành và mới
                                  </div>
                                );
                              })
                              .with("Highest_Rating", () => {
                                return (
                                  <div className="text-[13px] line-clamp-1 rounded-sm font-bold bg-[#fcbca0] px-2">
                                    Xếp hạng cao nhất
                                  </div>
                                );
                              })
                              .otherwise(() => {
                                return (
                                  <div className="text-[13px] rounded-sm font-bold bg-[#f1f08b] px-2">
                                    Bán chạy nhất
                                  </div>
                                );
                              })}
                          </>
                        ) : null}
                      </div>
                      <div className="flex items-center gap-3 py-[1px]">
                        <div>
                          <StarRatings
                            starRatedColor="#b46916"
                            rating={2.403}
                            starDimension="14px"
                            starSpacing="1px"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-[12px]">
                        <div>Học viên đăng ký:</div>
                        <div>800</div>
                      </div>
                      <div className="flex items-center gap-2 text-[16px] ">
                        <div className="font-semibold text-[17px]">
                          {convertMoneyVND(item.price ?? 0)}
                        </div>
                        <div className="line-through text-[12px] truncate">
                          {convertMoneyVND(item.discount ?? 0)}
                        </div>
                        <div className="text-[12px] rounded-sm bg-[#ec8f8f] text-[#ffff] px-1">
                          -20%
                        </div>
                      </div>
                    </div>
                  </Card>
                </React.Fragment>
              );
            })}
          </div>
          {/* </div> */}
        </div>
      </div>
      <PopupSettingMedia ref={popupSettingMediaRef} />
    </UserPageLayout>
  );
}
