import UserPageLayout from "../../../packages/layouts/user-page-layout/user-page-layout";
import { Card, Rate } from "antd";
import "./UserDasboard.scss";
import StarRatings from "react-star-ratings";

export default function UserDasboard() {
  return (
    <UserPageLayout>
      <Card
        className="Card_Container"
        style={{ width: 245 }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }>
        <div>
          <div>Khóa học đạo lý</div>
          <div>Quang</div>
          <div>Mô hình: Video</div>
          <div>20% giảm</div>
          <StarRatings rating={2.403} starDimension="15px" starSpacing="2px" />
          <div>2000000đ</div>
        </div>
      </Card>
    </UserPageLayout>
  );
}
