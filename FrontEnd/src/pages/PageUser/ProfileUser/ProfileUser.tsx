import React from "react";
import UserPageLayout from "../../../packages/layouts/user-page-layout/user-page-layout";
import { Tabs, TabsProps } from "antd";
import { nanoid } from "nanoid";
import "./ProfileUser.scss";
import { TabCourse } from "./TabsUser/TabsCourse/TabCourse";
import { TabResult } from "./TabsUser/TabsResult/TabResult";
import { TabIntroduce } from "./TabsUser/TabsIntroduce/TabIntroduce";
import { TabPostUser } from "./TabsUser/TabsPostUser/TabPostUser";
import { useQuery } from "@tanstack/react-query";
import { useConfigAPI } from "../../../packages/api/config-api";

export default function ProfileUser() {
  const dataProfile = [
    {
      BannerImg: "https://wallpapercave.com/wp/wp6514888.jpg",
      UserAvatar:
        "https://st.quantrimang.com/photos/image/2023/02/16/Anh-meo-lien-quan-13.jpg",
      UserName: "Nguyễn Thị Bích Tuệ",
      UserEmail: "Tuệ",
      UserPhone: "0987654321",
      UserAddress: "Hà Nội",
      UserGender: "Nam",
    },
  ];

  const api = useConfigAPI();

  const { data: Get_Profile, isLoading } = useQuery({
    queryKey: ["Get_Profile_User"],
    queryFn: async () => {
      const response = await api.Get_Profile_User();
      if (response.isSuccess) {
        return response.data;
      } else {
        console.log(response);
      }
    },
  });

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Khóa học của tôi",
      children: <TabCourse />,
    },
    {
      key: "2",
      label: "Kết quả học tập",
      children: <TabResult />,
    },
    {
      key: "3",
      label: "Bài viết",
      children: <TabPostUser />,
    },
    {
      key: "4",
      label: "Giới thiệu",
      children: <TabIntroduce />,
    },
  ];
  return (
    <UserPageLayout>
      <>
        <div className="flex justify-center">
          <>
            <div key={nanoid()} className="w-full relative">
              <div className="bg-[#ffff] h-[600px] box-shadow-card"></div>
              <div className="w-[80%] m-auto absolute top-0 left-[50%] translate-x-[-50%]">
                <div className="relative">
                  <div className="rounded-[15px] h-[300px] overflow-hidden">
                    {/* <img src={Get_Profile.BannerImg} className="h-full w-full" /> */}
                  </div>
                  <div className="absolute bottom-[-145px] left-[40px] right-[40px] border-b-[1px] border-[#c9c9c9] ">
                    <div className="flex items-center gap-5 mb-[18px]">
                      <div className="rounded-full border-[4px] border-[#fff] h-[160px] w-[160px] overflow-hidden">
                        <img
                          src={
                            Get_Profile?.avatar !== null
                              ? Get_Profile?.avatar
                              : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcellphones.com.vn%2Fsforum%2Favatar-trang&psig=AOvVaw2bu-h3YmHXyRTYzG4piZ8S&ust=1731296265917000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNiVp6_r0IkDFQAAAAAdAAAAABAx"
                          }
                          className="h-full w-full"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-[30px]">
                          {Get_Profile?.name}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-[150px] px-[40px]">
                  <Tabs
                    className="tabs_user_profile"
                    defaultActiveKey="1"
                    items={items}
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
          </>
        </div>
      </>
    </UserPageLayout>
  );
}
