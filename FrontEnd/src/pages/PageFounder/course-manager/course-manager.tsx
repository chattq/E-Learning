import AdminPageLayout from "../../../packages/layouts/admin-page-layout/admin-page-layout";
import "./course-manager.scss";

export default function CourseManager() {
  return (
    <AdminPageLayout>
      <div className="px-4 pt-3">
        <div className="p-[24px] mb-[16px] rounded-[6px] box-shadow-card bg-[#fff]">
          {/* <InforBaseProduct /> */}
        </div>
        <div className="p-[24px] mb-[16px] rounded-[6px] box-shadow-card bg-[#fff]">
          {/* <Tabs defaultActiveKey="1" items={items} onChange={onChange} /> */}
        </div>
      </div>
    </AdminPageLayout>
  );
}
