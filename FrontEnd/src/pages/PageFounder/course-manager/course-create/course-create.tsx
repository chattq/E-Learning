import { Button } from "antd";
import AdminPageLayout from "../../../../packages/layouts/admin-page-layout/admin-page-layout";
import { CardLayout } from "../../../../packages/ui/CardLayout/card-layout";
import { InforBaseCourse } from "./form-infor-base-course/infor-base-course";
import { InforContentCourse } from "./form-infor-content-course/infor-content-course";
import "./form-infor-base-course/infor-base-course.scss";
import InforDetailCourse from "./form-detail-course/infor-detail-course";
import CourseRequirements from "./course-requirements/course-requirements";
import CourseDescription from "./course-description/course-description";
import "./../course-manager.scss";
import { useCallback, useState } from "react";

export default function CourseCreate() {
  const [CourseType, setCourseType] = useState("");
  const onChangeCourseType = useCallback(
    (value: any) => {
      setCourseType(value);
    },
    [CourseType]
  );
  return (
    <AdminPageLayout>
      <div className="px-4 pt-[14px] w-full">
        <CardLayout title={"Thông tin cơ bản"}>
          <InforBaseCourse onChangeCourseType={onChangeCourseType} />
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
        {CourseType !== "online" && (
          <CardLayout
            title={"Nội dung khóa học"}
            textNoChild={"Có thể điều chỉnh sau khi chọn mô hình khóa học"}>
            <InforContentCourse />
          </CardLayout>
        )}

        <div className="h-[63px]"></div>
        <CardLayout
          className={
            "pb-[14.5px] fixed bottom-0 z-10 mb-[0px] right-[15px] left-[275px] boxShadowButton rounded-none"
          }>
          <div className="flex gap-4 justify-end">
            <Button color="red">Primary</Button>
            <Button color="red">Primary</Button>
            <Button color="red">Primary</Button>
          </div>
        </CardLayout>
      </div>
    </AdminPageLayout>
  );
}
