import { Button, FormInstance } from "antd";
import AdminPageLayout from "../../../../packages/layouts/admin-page-layout/admin-page-layout";
import { CardLayout } from "../../../../packages/ui/CardLayout/card-layout";
import { InforBaseCourse } from "./form-infor-base-course/infor-base-course";
import { InforContentCourse } from "./form-infor-content-course/infor-content-course";
import "./form-infor-base-course/infor-base-course.scss";
import "./../course-manager.scss";
import { useCallback, useRef, useState } from "react";
import { InforDetailCourse } from "./form-detail-course/infor-detail-course";
import { CourseRequirements } from "./course-requirements/course-requirements";
import { CourseDescription } from "./course-description/course-description";

export default function CourseCreate() {
  const [CourseType, setCourseType] = useState("");
  const InforBaseCourseRef = useRef<FormInstance>();
  const InforContentCourseRef = useRef<FormInstance>();
  const InforDetailCourseRef = useRef<FormInstance>();
  const CourseRequirementsRef = useRef<FormInstance>();
  const CourseDescriptionRef = useRef<any>();
  const onChangeCourseType = useCallback(
    (value: any) => {
      setCourseType(value);
    },
    [CourseType]
  );
  const hanldeSaveActive = async () => {
    try {
      // const valuesA = await InforBaseCourseRef.current?.validateFields();
      Promise.all([
        InforContentCourseRef.current?.validateFields(),
        InforBaseCourseRef.current?.validateFields(),
        CourseRequirementsRef.current?.validateFields(),
        InforDetailCourseRef.current?.validateFields(),
        CourseDescriptionRef.current.getValueDescription(),
      ]).then((values) => {
        const data = {
          InforContent: values[0] ?? null,
          InforBase: values[1] ?? null,
          CourseRequirements: values[2] ?? null,
          CourseKnowledge: values[3] ?? null,
          CourseDescription: values[4] ?? null,
        };
        console.log("data", data);
      });

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
              <InforDetailCourse ref={InforDetailCourseRef} />
              <CourseRequirements ref={CourseRequirementsRef} />
              <CourseDescription ref={CourseDescriptionRef} />
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
