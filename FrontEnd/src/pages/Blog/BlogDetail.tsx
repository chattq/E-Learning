import { Button, Card, Col, Rate, Row } from "antd";
// import "./UserDasboard.scss";
import StarRatings from "react-star-ratings";
import { useNavigate, useParams } from "react-router-dom";
import "./Blog.scss";
import { nanoid } from "nanoid";
import { match } from "ts-pattern";
import { EyeOutlined, RightOutlined } from "@ant-design/icons";
import { useConvertNumber } from "../../packages/hooks/useConvertNumber";
import UserPageLayout from "../../packages/layouts/user-page-layout/user-page-layout";
import { useQuery } from "@tanstack/react-query";
import { useConfigAPI } from "../../packages/api/config-api";
import LoadPanel from "../../packages/components/LoadPanel";

export default function BlogDetail() {
  const nav = useNavigate();
  const params = useParams();
  const api = useConfigAPI();
  const { convertMoneyVND } = useConvertNumber();

  const handleClickCourse = (code: any) => {
    nav(`blog/blog-detail/${code}`);
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

  const dataItem = Blogs_GetAllActive?.blogs?.find(
    (item: any) => item.blog_id == params.code
  );

  console.log("params", params.code);
  console.log("dataItem", dataItem);
  const dataCourse = [
    {
      id: nanoid(),
      image:
        "https://scr.vn/wp-content/uploads/2020/10/Anh-meo-cute-dang-yeu-de-thuong.jpg",
      title: "The Complete Python Bootcamp From Zero to Hero in Python",
      author: "Tuệ",
      decription: "Nhiều món ngon ngon",
    },
    {
      id: nanoid(),
      image:
        "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2020/03/hoa-sung-mua-nuoc-noi.jpg",
      title: "The Complete Python Bootcamp From Zero to Hero in Python",
      author: "Tuệ",
      decription: "Nhiều món ngon ngon",
    },
    {
      id: nanoid(),
      image:
        "https://img1.kienthucvui.vn/uploads/2019/07/19/hinh-anh-lang-bac-ho-o-ha-noi_112812656.jpg",
      title: "The Complete Python Bootcamp From Zero to Hero in Python",
      author: "Tuệ",
      decription: "Nhiều món ngon ngon",
    },
    {
      id: nanoid(),
      image:
        "https://img4.thuthuatphanmem.vn/uploads/2020/05/13/hinh-anh-4k-anime_062425625.jpg",
      title: "The Complete Python Bootcamp From Zero to Hero in Python",
      author: "Tuệ",
      decription: "Nhiều món ngon ngon",
    },
    // {
    //   id: nanoid(),
    //   image:
    //     "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/anh-meme-meo-cute-de-thuong.jpg",
    //   title: "The Complete Python Bootcamp From Zero to Hero in Python",
    //   author: "Tuệ",
    //   decription: "Nhiều món ngon ngon",
    // },
  ];
  return (
    <UserPageLayout>
      {isLoading && <LoadPanel />}

      <div className="px-4 py-4">
        <div className="blog-detail-item">
          <div
            className="rounded-md border-[0.5px]"
            style={{
              borderRadius: "20px",
              backgroundImage: `url(${
                dataItem?.image_url ??
                "https://i.pinimg.com/originals/24/9e/35/249e35a0defd32321096a0f627bbaee7.jpg"
              })`,
              height: "50vh",
              backgroundPosition: "center",
              backgroundSize: "100%",
            }}
          ></div>
          <h1
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            {dataItem?.blog_title}
          </h1>
          {/* <div className="blog-detail-item-content">
            <p>{dataItem?.blog_content}</p>
          </div> */}
          <div
            dangerouslySetInnerHTML={{ __html: `${dataItem?.blog_content}` }}
          />
        </div>
        <div
          className="bg-[#fff] rounded-md border-[0.5px]"
          style={{ marginTop: "40px" }}
        >
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
                          item.image_url ??
                          "https://i.pinimg.com/564x/77/f2/e4/77f2e4caf563e06b6fe9efb542ee76fc.jpg"
                        }
                      />
                    }
                  >
                    <div>
                      <div className="font-bold text-[16px] line-clamp-2 leading-[20px]">
                        {item.blog_title ?? ""}
                      </div>
                      <div
                        className="flex items-center"
                        style={{ width: "100%" }}
                      >
                        <img
                          src="https://i.pinimg.com/originals/24/97/87/2497878b60f4c362bb26333b778e4dc0.jpg"
                          style={{
                            width: "30px",
                            borderRadius: "50%",
                            marginRight: "10px",
                          }}
                        />
                        <div className="text-[14px] py-[15px]">
                          {item.blog_author ?? "Tuệ"}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-[13px]">
                        <div
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.blog_content ?? ""}
                        </div>
                      </div>
                      <div
                        className="flex items-center justify-between text-[12px]  "
                        style={{ marginTop: "10px" }}
                      >
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
