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

export default function BlogDetail() {
  const nav = useNavigate();
  const { convertMoneyVND } = useConvertNumber();
  const handleClickCourse = () => {
    nav("blog/blog-detail");
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
        <div className="blog-detail-item">
          <div
            className=" rounded-md border-[0.5px] "
            style={{
              borderRadius: "20px",
              backgroundImage:
                "url(" +
                "https://i.pinimg.com/originals/24/9e/35/249e35a0defd32321096a0f627bbaee7.jpg" +
                ")",
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
            Cách làm bánh chưng ngon nhất thế giới ngày Tết
          </h1>
          <div className="blog-detail-item-content">
            <p>
              Nấu bánh chưng là một phong tục tập quán, một nét đẹp truyền thống
              bao đời nay của người dân Việt Nam mỗi dịp Tết đến Xuân về. Cái
              không khí rộn ràng chuẩn bị gạo nếp, lá dong, lạt mềm… để gói bánh
              chưng đã tạo nên hồn vị Tết không thể nào quên được của mỗi người
              con đất Việt. <br />
              Thấy bánh chưng là thấy Tết! Dù bạn có đi đâu, làm gì, chỉ cần trở
              về bên gia đình, cùng nhau quây quần gói chiếc bánh chưng hay ngồi
              canh nồi bánh sôi sùng sục trên bếp lửa đầy than hồng đã thấy
              không khí Tết ùa về. Mùi hương thơm lừng tỏa ra hòa quyện hương lá
              dong, gạo nếp cái hoa vàng cùng vị ngọt bùi của đậu xanh, vị ngậy
              béo của nhân thịt trong chiếc bánh chưng đã tạo nên hương vị Tết
              không thể lẫn vào đâu được.
              <br /> Chiếc bánh chưng ngon không chỉ cần đảm bảo giữ được hương
              vị truyền thống mà còn phải được gói vuông vức, chắc chắn để khi
              bày lên mâm cỗ Tết, dĩa bánh chưng sẽ là điểm nhấn chính thu hút
              bất kì thực khách nào. Chỉ cần áp dụng ngay cách làm bánh chưng
              dưới đây và khéo léo một chút, bạn sẽ tự tin thể hiện cùng các
              thành viên nhà mình dịp Tết này rồi. Cùng xem ngay nhé!
            </p>
            <img
              src="https://i.pinimg.com/originals/a3/67/7b/a3677bcdcde9e6e3bece14286f569068.jpg"
              alt=""
              style={{
                width: "50%",
                margin: "0 auto",
              }}
            />
            <p>
              Nguyên liệu làm Bánh chưng: (Cho 5 cái bánh chưng) <br />
              Nếp 650 gr <br />
              Đậu xanh không vỏ 400 gr <br />
              Thịt ba chỉ heo 300 gr
              <br />
              Lá dong (có thể thêm lá riềng hoặc lá chuối tùy ý) để gói bánh.
            </p>
            <img
              src="https://cdn.tgdd.vn/Files/2015/01/31/605299/cach-lam-banh-chung-cho-ngay-tet.jpg"
              alt=""
              style={{
                width: "50%",
                margin: "0 auto",
              }}
            />
          </div>
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
