import { Button, Card, Col, Rate, Row } from "antd";
// import "./UserDasboard.scss";
import StarRatings from "react-star-ratings";
import { useNavigate } from "react-router-dom";
import "./Blog.scss";
import { nanoid } from "nanoid";
import { match } from "ts-pattern";
import { RightOutlined } from "@ant-design/icons";
import { useConvertNumber } from "../../packages/hooks/useConvertNumber";
import UserPageLayout from "../../packages/layouts/user-page-layout/user-page-layout";

export default function BlogList() {
  const nav = useNavigate();
  const { convertMoneyVND } = useConvertNumber();
  const handleClickCourse = () => {
    nav("/course-detail");
  };
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
      <div className="px-4 py-4">
        <div
          className="bg-[#bb0000] rounded-md border-[0.5px] "
          style={{ borderRadius: "20px" }}
        >
          <Row>
            <Col span={12} className="NameLeft">
              <h4>Cách làm món bò bít tết ngon hấp dẫn cho bữa tối</h4>
              <p>
                Bò bít tết (Beefsteak trong tiếng Anh hoặc bifteck trong tiếng
                Pháp) được chế biến từ thịt thăn bò. Thịt được cắt ngang thớ,
                mỏng từ 1-5 cm, loại bỏ gân và làm mềm. Sau đó cho thêm các loại
                gia vị và nước dùng chuyên dụng và chiên hoặc nướng hai mặt. Món
                này thể ăn kèm sốt, hành tây, khoai tây chiên, salad,...
              </p>
              <Button>Xem thêm</Button>
            </Col>
            <Col span={12} className="">
              <img
                src={
                  "https://i.pinimg.com/originals/80/51/c8/8051c8d221cd6bfca1d26e90f914e683.jpg"
                }
                alt="Banner"
                style={{
                  padding: "30px",
                  borderRadius: "50px",
                }}
              />
            </Col>
          </Row>
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
            {dataCourse.map((item: any) => {
              return (
                <div>
                  <Card
                    key={nanoid()}
                    onClick={() => handleClickCourse()}
                    className="Card_Container_Blog"
                    cover={
                      <img
                        className="h-[165px] object-cover"
                        alt="example"
                        src={item.image}
                      />
                    }
                  >
                    <div>
                      <div className="font-bold text-[16px] line-clamp-2 leading-[20px]">
                        {item.title}
                      </div>
                      <div className="text-[13px] py-[1px]">{item.author}</div>
                      {/* <div className="flex items-center gap-2 pt-[4px]">
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
                      </div> */}
                      {/* <div className="flex items-center gap-3 py-[1px]">
                        <div>
                          <StarRatings
                            starRatedColor="#b46916"
                            rating={2.403}
                            starDimension="14px"
                            starSpacing="1px"
                          />
                        </div>
                      </div> */}
                      <div className="flex items-center gap-1 text-[12px]">
                        <div>{item.decription}</div>
                      </div>
                      <div className="flex items-center gap-2 text-[16px] ">
                        <div className="font-semibold text-[17px]">
                          2000
                        </div>
                       
                        <div className="text-[12px] rounded-sm bg-[#ec8f8f] text-[#ffff] px-1">
                          -20%
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
