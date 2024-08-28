import { forwardRef } from "react";
import "./infor-base-course.scss";
import {
  Button,
  Cascader,
  CascaderProps,
  Form,
  Input,
  Radio,
  Select,
  Space,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { UploadFileCustom } from "../../../../../packages/ui/UploadFile/UploadFile";

type InforBaseCourseProps = {
  onChangeCourseType: (value: string) => void;
};

export const InforBaseCourse = forwardRef(
  ({ onChangeCourseType }: InforBaseCourseProps, ref) => {
    const { Option } = Select;

    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 18 },
      colon: false, //  là dấu :
    };
    interface DataNodeType {
      value: string;
      label: string;
      children?: DataNodeType[];
    }

    const residences: CascaderProps<DataNodeType>["options"] = [
      {
        value: "zhejiang",
        label: "Zhejiang",
        children: [
          {
            value: "hangzhou",
            label: "Hangzhou",
            children: [
              {
                value: "xihu",
                label: "West Lake",
              },
            ],
          },
        ],
      },
      {
        value: "jiangsu",
        label: "Jiangsu",
        children: [
          {
            value: "nanjing",
            label: "Nanjing",
            children: [
              {
                value: "zhonghuamen",
                label: "Zhong Hua Men",
              },
            ],
          },
        ],
      },
    ];

    const onFinish = (values: any) => {
      console.log("Received values of form: ", values);
    };
    const handleChangeCourseType = (value: string) => {
      console.log(`selected ${value}`);
      onChangeCourseType(value);
    };
    return (
      <Form
        name="validate_other"
        {...formItemLayout}
        labelWrap
        onFinish={onFinish}
        style={{ width: "100%", paddingTop: 20 }}>
        <Form.Item
          name="ImageCourse"
          label="Ảnh khóa học"
          className="labelCustom"
          rules={[{ required: true, message: "Không được để trống ô" }]}>
          <Space size={30} align="center">
            <UploadFileCustom />
            <div>
              <ul className="list-disc text-[#999] text-[12px]">
                <li>{`Tải lên hình ảnh 1:1.`}</li>
                <li>{`Ảnh bìa sẽ được hiển thị tại các trang Kết quả tìm kiếm, Gợi ý hôm nay,... Việc sử dụng ảnh bìa đẹp sẽ thu hút thêm lượt truy cập vào sản phẩm của bạn`}</li>
              </ul>
            </div>
          </Space>
        </Form.Item>
        <Form.Item
          name="VideoIntro"
          label="Video intro"
          className="labelCustom">
          <Space size={30} align="center">
            <UploadFileCustom />
            <div>
              <ul className="list-disc text-[#999] text-[12px]">
                <li>Kích thước: Tối đa 30Mb</li>
                <li>{`Định dạng: MP4 (không hỗ trợ vp9)`}</li>
                <li>{`Lưu ý: sản phẩm có thể hiển thị trong khi video đang được xử lý. Video sẽ tự động hiển thị sau khi đã xử lý thành công`}</li>
              </ul>
            </div>
          </Space>
        </Form.Item>
        <Form.Item
          name="ProductName"
          label="Tên khóa học"
          rules={[{ required: true, message: "Không được để trống ô" }]}>
          <Input showCount maxLength={120} placeholder="Nhập vào" />
        </Form.Item>

        <Form.Item
          name="ProductCategory"
          label="Danh mục"
          rules={[
            {
              required: true,
              message: "Please select your favourite colors!",
            },
          ]}>
          <Cascader options={residences} placeholder={"Chọn ngành hàng"} />
        </Form.Item>
        <Form.Item
          name="CourseType"
          label="Mô hình khóa học"
          rules={[
            {
              required: true,
              message: "Please select your favourite colors!",
            },
          ]}>
          <Select
            onChange={handleChangeCourseType}
            options={[
              { value: "video", label: "Video" },
              { value: "online", label: "Online" },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="ProductDes"
          label="Mô tả khóa học"
          rules={[
            {
              type: "array",
              required: true,
              message: "Mô tả sản phẩm không được để trống",
            },
          ]}>
          <TextArea
            showCount
            maxLength={3000}
            // onChange={onChange}
            style={{ height: 200, resize: "none" }}
          />
        </Form.Item>
      </Form>
    );
  }
);
