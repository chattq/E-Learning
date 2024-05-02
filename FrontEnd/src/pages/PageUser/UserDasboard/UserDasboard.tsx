import UserPageLayout from "../../../packages/layouts/user-page-layout/user-page-layout";
import { Card, Rate } from "antd";
import "./UserDasboard.scss";
import StarRatings from "react-star-ratings";
import { useNavigate } from "react-router-dom";

export default function UserDasboard() {
  const nav = useNavigate();
  const handleClickCourse = () => {
    nav("/course-detail");
  };
  return (
    <UserPageLayout>
      <div className="px-4 py-4 flex gap-5 flex-wrap">
        <Card
          onClick={() => handleClickCourse()}
          className="Card_Container"
          style={{ width: 260 }}
          cover={
            <img
              className="h-[165px]"
              alt="example"
              src="https://scr.vn/wp-content/uploads/2020/10/Anh-meo-cute-dang-yeu-de-thuong.jpg"
            />
          }>
          <div>
            <div className="font-bold text-[16px] line-clamp-2 leading-[20px]">
              The Complete Python Bootcamp From Zero to Hero in Python
            </div>
            <div className="text-[13px] py-[1px]">Quang</div>
            <div className="flex items-center gap-2 pt-[4px] flex-wrap">
              <div className="text-[13px] rounded-sm font-bold bg-[#4db2dd] text-[#ffff] px-1">
                Video
              </div>
              <div className="text-[13px] rounded-sm font-bold bg-[#f1f08b] px-2">
                Bán chạy nhất
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div>
                <StarRatings
                  starRatedColor="#b46916"
                  rating={2.403}
                  starDimension="14px"
                  starSpacing="1px"
                />
              </div>
              <div className="flex items-center gap-1 text-[12px] mt-[5px]">
                <div>Học viên:</div>
                <div>800</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[16px] ">
              <div className="font-semibold text-[17px]">2000000đ</div>
              <div className="line-through text-[12px] truncate">200000đ</div>
              <div className="text-[12px] rounded-sm bg-[#e57676] text-[#ffff] px-1">
                -20%
              </div>
            </div>
          </div>
        </Card>
        <Card
          onClick={() => handleClickCourse()}
          className="Card_Container"
          style={{ width: 260 }}
          cover={
            <img
              className="h-[165px]"
              alt="example"
              src="https://phunugioi.com/wp-content/uploads/2020/10/anh-dai-dien.jpg"
            />
          }>
          <div>
            <div className="font-bold text-[16px] line-clamp-2 leading-[20px]">
              AWS Certified Solutions Architect - Associate (Tiếng Việt)
            </div>
            <div className="text-[13px] py-[1px]">Quang</div>
            <div className="flex items-center gap-2 pt-[4px] flex-wrap">
              <div className="text-[13px] rounded-sm font-bold bg-[#4db2dd] text-[#ffff] px-1">
                Online
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div>
                <StarRatings
                  starRatedColor="#b46916"
                  rating={2.403}
                  starDimension="14px"
                  starSpacing="1px"
                />
              </div>
              <div className="flex items-center gap-1 text-[12px] mt-[5px]">
                <div>Học viên:</div>
                <div>800</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[16px] ">
              <div className="font-semibold text-[17px]">2000000đ</div>
              <div className="line-through text-[12px] truncate">200000đ</div>
              <div className="text-[12px] rounded-sm bg-[#e57676] text-[#ffff] px-1">
                -20%
              </div>
            </div>
          </div>
        </Card>
      </div>
    </UserPageLayout>
  );
}
