import { forwardRef, useState } from "react";
import "./infor-base-course.scss";
import {
  Button,
  Cascader,
  CascaderProps,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Radio,
  RadioChangeEvent,
  Select,
  Space,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { UploadFileCustom } from "../../../../../packages/ui/UploadFile/UploadFile";
import { useQuery } from "@tanstack/react-query";
import { useConfigAPI } from "../../../../../packages/api/config-api";
import { formatDataCategoriesCourse } from "../logic";
import ReactQuill from "react-quill";

type InforBaseCourseProps = {
  onChangeCourseType: (value: string) => void;
};

export const InforBaseCourse = forwardRef(
  ({ onChangeCourseType }: InforBaseCourseProps, ref: any) => {
    const api = useConfigAPI();
    const [form] = Form.useForm();
    const { data: Categories_GetAllActive, isLoading } = useQuery({
      queryKey: ["Categories_GetAllActive"],
      queryFn: async () => {
        const response = await api.Categories_GetAllActive();
        if (response.isSuccess) {
          return response.data;
        } else {
          console.log(response);
        }
      },
    });
    const [value, setValue] = useState("");

    const modules = {
      toolbar: [
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" },
        ], // Căn trái, giữa, phải, đều
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["bold", "italic", "underline"],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ["link", "image"],
        ["clean"], // Xóa định dạng
      ],
      clipboard: {
        matchVisual: false, // Giữ nguyên định dạng của nội dung được dán
      },
    };
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 18 },
      colon: false, //  là dấu :
    };

    const onFinish = (values: any) => {
      console.log("Received values of form: ", values);
    };
    const handleChangeCourseType = (e: RadioChangeEvent) => {
      console.log(`selected ${e.target.value}`);
      onChangeCourseType(e.target.value);
    };

    return (
      <Form
        ref={ref}
        name="validate_other"
        {...formItemLayout}
        labelWrap
        initialValues={{
          CourseType: "charge",
          CourseDescription: "",
          ImageCourse: "",
          VideoIntroCourse: "",
          CourseName: "",
          CourseModel: "",
          CourseCategory: "",
          CoursePrice: 0,
        }}
        onFinish={onFinish}
        style={{ width: "100%", paddingTop: 20 }}>
        <Form.Item
          name="ImageCourse"
          label="Ảnh khóa học"
          className="labelCustom"
          rules={[
            { required: true, message: "Ảnh khóa học không được để trống!" },
          ]}>
          <Space size={30} align="center">
            <UploadFileCustom
              accept="image/*"
              getDataFile={(data) => {
                ref.current.setFieldValue("ImageCourse", data?.url);
              }}
            />
            <div>
              <ul className="list-disc text-[#999] text-[12px]">
                <li>{`Tải lên hình ảnh 1:1.`}</li>
                <li>{`Ảnh bìa sẽ được hiển thị tại các trang Kết quả tìm kiếm, Gợi ý hôm nay,... Việc sử dụng ảnh bìa đẹp sẽ thu hút thêm lượt truy cập vào sản phẩm của bạn`}</li>
              </ul>
            </div>
          </Space>
        </Form.Item>
        <Form.Item
          name="VideoIntroCourse"
          label="Video intro"
          className="labelCustom">
          <Space size={30} align="center">
            <UploadFileCustom
              accept="video/*"
              getDataFile={(data) => {
                ref.current.setFieldValue("VideoIntroCourse", data?.url);
              }}
            />
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
          name="CourseName"
          label="Tên khóa học"
          rules={[{ required: true, message: "Không được để trống ô!" }]}>
          <Input placeholder="Nhập vào" />
        </Form.Item>
        <Form.Item
          name="CourseModel"
          label="Mô hình khóa học"
          rules={[
            {
              required: true,
              message: "Không được để trống ô!",
            },
          ]}>
          <Radio.Group onChange={handleChangeCourseType}>
            <Radio value={"video"}>Video</Radio>
            <Radio value={"online"}>Online</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="CourseCategory"
          label="Danh mục"
          rules={[
            {
              required: true,
              message: "Không được để trống ô!",
            },
          ]}>
          <Cascader
            options={formatDataCategoriesCourse(Categories_GetAllActive)}
            placeholder={"Chọn ngành hàng"}
          />
        </Form.Item>

        <Form.Item name="CourseType" label="Loại khóa học">
          <Radio.Group defaultValue={"charge"}>
            <Radio value={"charge"}>Mất phí</Radio>
            <Radio value={"free"}>Free</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.CourseType !== currentValues.CourseType
          }
          noStyle>
          {({ getFieldValue }) => {
            const courseType = getFieldValue("CourseType");
            return courseType === "charge" ? (
              <Form.Item
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 18 }}
                name={"CoursePrice"}
                label="Đơn giá">
                <InputNumber
                  min={0}
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            ) : null;
          }}
        </Form.Item>
        <Form.Item
          name="CourseOverview"
          label="Tổng quan"
          rules={[
            {
              required: true,
              message: "Tổng quan khóa học không được để trống",
            },
          ]}>
          <TextArea
            style={{
              width: "100%",
              height: 100,
            }}
          />
        </Form.Item>
      </Form>
    );
  }
);
