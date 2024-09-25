import { Button, FormInstance } from "antd";
import AdminPageLayout from "../../../../packages/layouts/admin-page-layout/admin-page-layout";
import { CardLayout } from "../../../../packages/ui/CardLayout/card-layout";
import { InforBaseCourse } from "./form-infor-base-course/infor-base-course";
import { InforContentCourse } from "./form-infor-content-course/infor-content-course";
import "./form-infor-base-course/infor-base-course.scss";
import InforDetailCourse from "./form-detail-course/infor-detail-course";
import CourseRequirements from "./course-requirements/course-requirements";
import CourseDescription from "./course-description/course-description";
import "./../course-manager.scss";
import { useCallback, useRef, useState } from "react";

export default function CourseCreate() {
  const [CourseType, setCourseType] = useState("");
  const InforBaseCourseRef = useRef<FormInstance>();
  const InforContentCourseRef = useRef<FormInstance>();
  const onChangeCourseType = useCallback(
    (value: any) => {
      setCourseType(value);
    },
    [CourseType]
  );
  const hanldeSaveActive = async () => {
    try {
      // const valuesA = await InforBaseCourseRef.current?.validateFields();
      const valuesB = await InforContentCourseRef.current?.validateFields();

      // Gộp dữ liệu từ Form A và Form B
      const combinedData = {
        // ...valuesA,
        ...valuesB,
      };

      console.log("Combined Data:", combinedData);
      // Thực hiện lưu dữ liệu gộp ở đây
    } catch (errorInfo) {
      console.log("Validation Failed:", errorInfo);
    }
  };
  return (
    <AdminPageLayout>
      <div className="px-4 pt-[14px] w-full">
        <CardLayout title={"Thông tin cơ bản"}>
          <InforBaseCourse
            ref={InforBaseCourseRef}
            onChangeCourseType={onChangeCourseType}
          />
        </CardLayout>

        <CardLayout
          title={"Chi tiết khóa học"}
          textNoChild={"Có thể điều chỉnh sau khi chọn mô hình khóa học"}>
          {CourseType !== "" && (
            <>
              <InforDetailCourse />
              <CourseRequirements />
              <CourseDescription />
            </>
          )}
        </CardLayout>
        <CardLayout
          visible={CourseType === "online" ? true : false}
          title={"Nội dung khóa học"}
          textNoChild={"Có thể điều chỉnh sau khi chọn mô hình khóa học"}>
          {CourseType !== "" && (
            <InforContentCourse ref={InforContentCourseRef} />
          )}
        </CardLayout>

        <div className="h-[63px]"></div>
        <CardLayout
          className={
            "pb-[14.5px] fixed bottom-0 z-10 mb-[0px] right-[15px] left-[275px] boxShadowButton rounded-none"
          }>
          <div className="flex gap-4 justify-end">
            <Button color="red" onClick={hanldeSaveActive}>
              Lưu & Hiển thị
            </Button>
            <Button color="red">Lưu & Ẩn</Button>
          </div>
        </CardLayout>
      </div>
    </AdminPageLayout>
  );
}
