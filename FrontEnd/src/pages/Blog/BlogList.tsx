import { Button, Card, Col, Rate, Row } from "antd";
// import "./UserDasboard.scss";
import StarRatings from "react-star-ratings";
import { useNavigate } from "react-router-dom";
import "./Blog.scss";
import { nanoid } from "nanoid";
import { match } from "ts-pattern";
import { EyeOutlined, RightOutlined } from "@ant-design/icons";
import { useConvertNumber } from "../../packages/hooks/useConvertNumber";
import UserPageLayout from "../../packages/layouts/user-page-layout/user-page-layout";

export default function BlogList() {
  const nav = useNavigate();
  const { convertMoneyVND } = useConvertNumber();
  const handleClickCourse = () => {
    nav("/blog/blog-detail");
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
            <Col
              span={12}
              className="NameLeft"
              style={{ width: "30%", padding: "60px 40px" }}
            >
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
                          {item.author}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-[13px]">
                        <div>{item.decription}</div>
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
        <div
          className="bg-[#fff] rounded-md border-[0.5px]"
          style={{ marginTop: "40px" }}
        >
          <div className="flex justify-between items-center py-2 border-b-[0.5px] px-5">
            <div className="text-[18px] uppercase font-semibold">
              Bài viết nổi bật
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
                          {item.author}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-[13px]">
                        <div>{item.decription}</div>
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
        <div
          className="bg-[#fff] rounded-md border-[0.5px]"
          style={{ marginTop: "40px" }}
        >
          <div className="flex justify-between items-center py-2 border-b-[0.5px] px-5">
            <div className="text-[18px] uppercase font-semibold">
              Bài viết có thể bạn thích
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
                          {item.author}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-[13px]">
                        <div>{item.decription}</div>
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
