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
import { Banner } from "./styleUserDasboard/styleUserDasboard";
import banneritem from "../../../assets/img/banneritem.png";
import Meta from "antd/es/card/Meta";
import { useQuery } from "@tanstack/react-query";
import { useConfigAPI } from "../../../packages/api/config-api";

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

  const api = useConfigAPI();
  const { data: Course_GetAllActive, isLoading } = useQuery({
    queryKey: ["Blogs_GetAllActive"],
    queryFn: async () => {
      const response = await api.Course_GetAll();
      if (response.isSuccess) {
        return response.data;
      } else {
        console.log(response);
      }
    },
  });

  console.log("Course_GetAllActive", Course_GetAllActive);

  return (
    <UserPageLayout>
      <Banner className="grid grid-cols-2 gap-2">
        <div className="banner__content ">
          <p className="title_banner_content">
            Học lập trình không khó cùng Rosie
          </p>
          <p>
            Học lập trình từ cơ bản đến nâng cao. Rosie sẽ dạy bạn chi tiết nhất
            có thể !
          </p>
          <Button className="btn_banner_content">Học miễn phí ngay</Button>
        </div>
        <img
          style={{ width: "50vh", marginLeft: "100px", marginTop: "60px" }}
          src={banneritem}
        />
      </Banner>
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
            {Course_GetAllActive?.map((item: any) => {
              return (
                <React.Fragment key={nanoid()}>
                  <Card
                    onClick={() => handleClickCourse(item)}
                    className="Card_Container cursor-pointer"
                    cover={
                      <img
                        className="h-[165px] object-cover"
                        alt="example"
                        src={item.course_image}
                      />
                    }
                  >
                    <div>
                      <div className="font-bold text-[16px] line-clamp-2 leading-[20px]">
                        {item.title}
                      </div>
                      <div className="text-[13px] py-[1px]">
                        {item.course_create_by}
                      </div>
                      <div className="flex items-center gap-2 pt-[4px]">
                        <div className="text-[13px] rounded-sm font-bold bg-[#3eceb9] text-[#ffff] px-1">
                          {item.course_type}
                        </div>
                        {/* {item.course_active ? (
                          <>
                            {match(item.course_active)
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
                        ) : null} */}
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
                          {convertMoneyVND(item.course_price ?? 0)}
                        </div>
                        <div className="line-through text-[12px] truncate">
                          {convertMoneyVND(item.course_discount ?? 0)}
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
      <div className="our_success">
        <h4>Thành tựu của chúng tôi</h4>
        <p>
          Chúng tôi tự hào có nhiều học viên đăng ký học và tin tưởng chúng tôi{" "}
        </p>
        <div className="list-success">
          <div>
            75K+
            <p>Học viên</p>
          </div>
          <div>
            95% <p>có việc làm sau khi tốt nghiệp khóa học</p>{" "}
          </div>
          <div>
            372 <p>Giáo viên nhiều kinh nghiệm</p>
          </div>
          <div>
            16 <p>năm kinh nghiệm</p>
          </div>
        </div>
      </div>
      <div className="overview_us">
        <h4>Tổng quan về chúng tôi</h4>
        <p>
          Trong thời đại công nghệ số phát triển mạnh mẽ, nhu cầu học tập trực
          tuyến ngày càng trở nên phổ biến và thiết yếu. Đáp ứng nhu cầu đó,
          trang web [Tên Trang Web] đã ra đời, mang đến cho người dùng một nền
          tảng học tập toàn diện, tiện lợi và chất lượng cao. <br />
          <br />
          [Tên Trang Web] là nơi hội tụ của các khóa học đa dạng, từ kiến thức
          cơ bản đến chuyên sâu, phù hợp với mọi độ tuổi và trình độ. Trang web
          không chỉ cung cấp các khóa học về lĩnh vực công nghệ, khoa học, mà
          còn mở rộng ra các lĩnh vực như nghệ thuật, ngôn ngữ, kỹ năng mềm, và
          nhiều hơn nữa. Người học có thể lựa chọn học theo lộ trình riêng, với
          thời gian linh hoạt và nội dung phong phú.
          <br />
          <br /> Một trong những điểm nổi bật của [Tên Trang Web] là đội ngũ
          giảng viên uy tín, giàu kinh nghiệm, luôn sẵn sàng chia sẻ kiến thức
          và giải đáp thắc mắc cho học viên. Mỗi khóa học được thiết kế với sự
          kết hợp giữa lý thuyết và thực hành, giúp học viên không chỉ nắm vững
          kiến thức mà còn ứng dụng hiệu quả vào thực tế.
          <br />
          <br />
          Giao diện của trang web thân thiện, dễ sử dụng, hỗ trợ đa nền tảng
          giúp người dùng có thể học tập mọi lúc, mọi nơi, chỉ với một thiết bị
          kết nối internet. Bên cạnh đó, [Tên Trang Web] cũng thường xuyên cập
          nhật nội dung mới, phù hợp với xu hướng và nhu cầu của người học.{" "}
          <br />
          <br />
          [Tên Trang Web] không chỉ là nơi để học tập mà còn là một cộng đồng
          học tập sôi động, nơi học viên có thể kết nối, trao đổi kinh nghiệm,
          và hỗ trợ lẫn nhau trong quá trình học. Hệ thống đánh giá và cấp chứng
          chỉ uy tín của trang web cũng là một trong những điểm thu hút đông đảo
          người học tham gia. <br />
          <br />
          Với sứ mệnh mang đến kiến thức cho mọi người, [Tên Trang Web] tự hào
          là đối tác đáng tin cậy trên hành trình học tập và phát triển của bạn.
          Hãy tham gia ngay hôm nay để khám phá và nâng cao kiến thức, kỹ năng
          của mình với [Tên Trang Web].
        </p>
      </div>

      <div className="our_teacher">
        <Card
          hoverable
          style={{ width: 240 }}
          cover={
            <img
              alt="example"
              src="https://scontent.fhan17-1.fna.fbcdn.net/v/t1.6435-9/68885816_504970150260077_8076612689331224576_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeHPZBi1uuBF82Y8qEFxWPVaq4RijZhNHnKrhGKNmE0ecukakqaUNnYlpg9_605ysCqprOeTxgryHqpGZ8d_PYGm&_nc_ohc=1gG6k47TadIQ7kNvgFyme-F&_nc_ht=scontent.fhan17-1.fna&oh=00_AYA9WfRDweuOH7p-ALJIKsiYYGq08dIlNHy1UNpLih2s_A&oe=66DD2B54"
            />
          }
        >
          <h5>Nguyễn Mạnh Thắng</h5>
          <p>6 năm kinh nghiệp giảng dạy với nhiều chứng chỉ</p>
        </Card>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={
            <img
              alt="example"
              src="https://scontent.fhan17-1.fna.fbcdn.net/v/t1.6435-9/68885816_504970150260077_8076612689331224576_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeHPZBi1uuBF82Y8qEFxWPVaq4RijZhNHnKrhGKNmE0ecukakqaUNnYlpg9_605ysCqprOeTxgryHqpGZ8d_PYGm&_nc_ohc=1gG6k47TadIQ7kNvgFyme-F&_nc_ht=scontent.fhan17-1.fna&oh=00_AYA9WfRDweuOH7p-ALJIKsiYYGq08dIlNHy1UNpLih2s_A&oe=66DD2B54"
            />
          }
        >
          <h5>Nguyễn Mạnh Thắng</h5>
          <p>16 năm kinh nghiệp giảng dạy với nhiều chứng chỉ</p>
        </Card>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={
            <img
              alt="example"
              src="https://scontent.fhan17-1.fna.fbcdn.net/v/t1.6435-9/68885816_504970150260077_8076612689331224576_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeHPZBi1uuBF82Y8qEFxWPVaq4RijZhNHnKrhGKNmE0ecukakqaUNnYlpg9_605ysCqprOeTxgryHqpGZ8d_PYGm&_nc_ohc=1gG6k47TadIQ7kNvgFyme-F&_nc_ht=scontent.fhan17-1.fna&oh=00_AYA9WfRDweuOH7p-ALJIKsiYYGq08dIlNHy1UNpLih2s_A&oe=66DD2B54"
            />
          }
        >
          <h5>Nguyễn Mạnh Thắng</h5>
          <p>6 năm kinh nghiệp giảng dạy với nhiều chứng chỉ</p>
        </Card>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={
            <img
              alt="example"
              src="https://scontent.fhan17-1.fna.fbcdn.net/v/t1.6435-9/68885816_504970150260077_8076612689331224576_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeHPZBi1uuBF82Y8qEFxWPVaq4RijZhNHnKrhGKNmE0ecukakqaUNnYlpg9_605ysCqprOeTxgryHqpGZ8d_PYGm&_nc_ohc=1gG6k47TadIQ7kNvgFyme-F&_nc_ht=scontent.fhan17-1.fna&oh=00_AYA9WfRDweuOH7p-ALJIKsiYYGq08dIlNHy1UNpLih2s_A&oe=66DD2B54"
            />
          }
        >
          <h5>Nguyễn Mạnh Thắng</h5>
          <p>6 năm kinh nghiệp giảng dạy với nhiều chứng chỉ</p>
        </Card>
      </div>

      <div className="overview-us"></div>
      <PopupSettingMedia ref={popupSettingMediaRef} />
    </UserPageLayout>
  );
}
