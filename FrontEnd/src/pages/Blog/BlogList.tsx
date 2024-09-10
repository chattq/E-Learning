import { useRef, useState } from "react";
import { Button, Card, Col, Flex, Rate, Row, Spin } from "antd";
// import "./UserDasboard.scss";
import StarRatings from "react-star-ratings";
import { useNavigate } from "react-router-dom";
import "./Blog.scss";
import { nanoid } from "nanoid";
import { match } from "ts-pattern";
import { EyeOutlined, LoadingOutlined, RightOutlined } from "@ant-design/icons";
import { useConvertNumber } from "../../packages/hooks/useConvertNumber";
import UserPageLayout from "../../packages/layouts/user-page-layout/user-page-layout";
import { useConfigAPI } from "../../packages/api/config-api";
import { useQuery } from "@tanstack/react-query";
import LoadPanel from "../../packages/components/LoadPanel";

export default function BlogList() {
  const nav = useNavigate();
  const api = useConfigAPI();
  const { convertMoneyVND } = useConvertNumber();
  const handleClickCourse = (code: any) => {
    nav(`/blog/blog-detail/${code}`);
  };

  const handleClickCreateBlog = () => {
    nav(`/blog/create`);
  };

  const { data: Blogs_GetAllActive, isLoading } = useQuery({
    queryKey: ["Blogs_GetAllActive"],
    queryFn: async () => {
      const response = await api.Blogs_GetAll();
      if (response.isSuccess) {
        return response.data;
      } else {
        console.log(response);
      }
    },
  });

  console.log("Blogs_GetAllActive", Blogs_GetAllActive?.blogs);

  return (
    <UserPageLayout>
      {isLoading && <LoadPanel />}

      <div
        dangerouslySetInnerHTML={{
          __html: Blogs_GetAllActive?.blogs[6].blog_content,
        }}></div>

      <div className="px-4 py-4">
        <Button onClick={() => handleClickCreateBlog()}>
          Tạo bài viết mới
        </Button>
        <div
          className="bg-[#bb0000] rounded-md border-[0.5px] "
          style={{ borderRadius: "20px" }}>
          <Row>
            <Col
              span={12}
              className="NameLeft"
              style={{ width: "30%", padding: "60px 40px" }}>
              <h4>
                {
                  Blogs_GetAllActive?.blogs[
                    Blogs_GetAllActive?.blogs.length - 1
                  ]?.blog_title
                }
              </h4>
              <p
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                }}>
                {
                  Blogs_GetAllActive?.blogs[
                    Blogs_GetAllActive?.blogs.length - 1
                  ]?.blog_content
                }
              </p>
              <Button
                onClick={() =>
                  handleClickCourse(
                    Blogs_GetAllActive?.blogs[
                      Blogs_GetAllActive?.blogs.length - 1
                    ]?.blog_id
                  )
                }>
                Xem thêm
              </Button>
            </Col>
            <Col span={12} className="">
              <img
                src={
                  Blogs_GetAllActive?.blogs[
                    Blogs_GetAllActive?.blogs.length - 1
                  ]?.image_url ??
                  "https://i.pinimg.com/originals/80/51/c8/8051c8d221cd6bfca1d26e90f914e683.jpg"
                }
                alt="Banner"
                style={{
                  padding: "30px",
                  borderRadius: "50px",
                  width: "400px",
                  marginLeft: "25%",
                }}
              />
            </Col>
          </Row>
        </div>
        <div
          className="bg-[#fff] rounded-md border-[0.5px]"
          style={{ marginTop: "40px" }}>
          <div className="flex justify-between items-center py-2 border-b-[0.5px] px-5">
            <div className="text-[18px] uppercase font-semibold">
              Bài viết mới nhất
            </div>
            <div className="font-medium hover:underline cursor-pointer">
              Xem thêm <RightOutlined />
            </div>
          </div>
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 lg:gap-2 md:grid-cols-1 md:gap-4 md:px-4 md:py-4 sm:grid-cols-1 px-5 py-5 xl:gap-5 gap-5">
            {Blogs_GetAllActive?.blogs?.map((item: any) => {
              return (
                <div>
                  <Card
                    key={nanoid()}
                    onClick={() => handleClickCourse(item?.blog_id)}
                    className="Card_Container_Blog"
                    cover={
                      <img
                        className="h-[165px] object-cover"
                        alt="example"
                        src={
                          item?.image_url ??
                          "https://i.pinimg.com/564x/77/f2/e4/77f2e4caf563e06b6fe9efb542ee76fc.jpg"
                        }
                      />
                    }>
                    <div>
                      <div className="font-bold text-[16px] line-clamp-2 leading-[20px]">
                        {item?.blog_title ?? ""}
                      </div>
                      <div
                        className="flex items-center"
                        style={{ width: "100%" }}>
                        <img
                          src="https://i.pinimg.com/originals/24/97/87/2497878b60f4c362bb26333b778e4dc0.jpg"
                          style={{
                            width: "30px",
                            borderRadius: "50%",
                            marginRight: "10px",
                          }}
                        />
                        <div className="text-[14px] py-[15px]">
                          {item?.blog_author ?? "Tuệ"}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-[13px]">
                        <div
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}>
                          {item?.blog_content ?? ""}
                        </div>
                      </div>
                      <div
                        className="flex items-center justify-between text-[12px]  "
                        style={{ marginTop: "10px" }}>
                        <div className="text-[12px] px-1">
                          {" "}
                          <EyeOutlined /> <span>2200</span>
                        </div>
                        <div className="font-medium hover:underline cursor-pointer">
                          Xem thêm <RightOutlined />
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>

          {/* </div> */}
        </div>
      </div>
    </UserPageLayout>
  );
}
