import { Button } from "antd";
import AdminPageLayout from "../../../../packages/layouts/admin-page-layout/admin-page-layout";
import { CardLayout } from "../../../../packages/ui/CardLayout/card-layout";
import { InforBaseCourse } from "./form-infor-base-course/infor-base-course";

export default function CourseCreate() {
  return (
    <AdminPageLayout>
      <div className="px-4 pt-[14px] w-full">
        <CardLayout title={"Thông tin cơ bản"}>
          <InforBaseCourse />
        </CardLayout>
        <CardLayout
          className={
            "pb-[16px] fixed bottom-0 z-10 mb-0 right-[15px] left-[266px] boxShadowButton"
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
