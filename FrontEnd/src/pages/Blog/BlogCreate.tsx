import { useState } from "react";
import UserPageLayout from "../../packages/layouts/user-page-layout/user-page-layout";
import ReactQuill from "react-quill";
import { Button, Input } from "antd";
import { useWindowSize } from "../../packages/hooks/useWindowSize";
import "./Blog.scss";

export default function BlogCreate() {
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
  const windowSize = useWindowSize();

  return (
    <UserPageLayout>
      <div
        className="m-4 bg-[#fff] rounded-md border-[1px] "
        style={{
          height: windowSize.height - 98,
        }}>
        <div className="flex px-4">
          <div className="w-[50%] border-r-[1px]">
            <Input
              className="px-4 w-full border-none focus:outline-none focus:border-none focus:shadow-none text-[28px] outline-none"
              placeholder="Nhập tiêu đề"
            />
            <ReactQuill
              style={{
                background: "#fff",
                height: windowSize.height - 233,
                width: "100%",
              }}
              modules={modules}
              theme="snow"
              value={value}
              onChange={setValue}
            />
          </div>
          <div className="w-[50%]">
            <div className="border-b-[1px] py-[10px] flex justify-end">
              <Button>Lưu bài viết</Button>
            </div>
            <div
              className="overflow-y-scroll py-1 px-5 scroll-blog"
              style={{
                height: windowSize.height - 168,
              }}>
              <div
                dangerouslySetInnerHTML={{
                  __html: value,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </UserPageLayout>
  );
}
