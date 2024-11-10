import { Button, FormInstance, message } from "antd";
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
import { useSetAtom } from "jotai";
import { showErrorAtom } from "../../../../packages/ui/Error/error-store";
import { useConfigAPI } from "../../../../packages/api/config-api";

export default function CourseCreate() {
  const [CourseType, setCourseType] = useState("");
  const InforBaseCourseRef = useRef<FormInstance>();
  const InforContentCourseRef = useRef<FormInstance>();
  const InforDetailCourseRef = useRef<FormInstance>();
  const CourseRequirementsRef = useRef<FormInstance>();
  const CourseDescriptionRef = useRef<any>();
  const setShowError = useSetAtom(showErrorAtom);
  const api = useConfigAPI();
  const onChangeCourseType = useCallback(
    (value: any) => {
      setCourseType(value);
    },
    [CourseType]
  );
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Tạo khóa học thành công!",
    });
  };

  const hanldeSaveActive = useCallback(async () => {
    try {
      console.log(42, "a");
      // const valuesA = await InforBaseCourseRef.current?.validateFields();
      Promise.all([
        InforContentCourseRef.current?.validateFields(),
        InforBaseCourseRef.current?.validateFields(),
        CourseRequirementsRef.current?.validateFields(),
        InforDetailCourseRef.current?.validateFields(),
        CourseDescriptionRef.current.getValueDescription(),
      ]).then(async (values) => {
        const data = {
          InforContent: values[0] ?? null,
          InforBase: values[1] ?? null,
          CourseRequirements: values[2] ?? null,
          CourseKnowledge: values[3] ?? null,
          CourseDescription: values[4] ?? null,
        };
        console.log("data", data);
        const response: any = await api.Coursess_Create(data);
        if (response.isSuccess) {
          success();
        } else {
          setShowError({
            isSuccess: false,
            message: response.message,
            data: {
              message: response.message,
            },
          });
        }
      });

      // Thực hiện lưu dữ liệu gộp ở đây
    } catch (errorInfo) {
      console.log("Validation Failed:", errorInfo);
    }
  }, []);
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
      {contextHolder}
    </AdminPageLayout>
  );
}
