import { forwardRef, useImperativeHandle, useState } from "react";
import "./course-description.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import ReactQuill from "react-quill";

export const CourseDescription = forwardRef(({}, ref: any) => {
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
  useImperativeHandle(ref, () => ({
    getValueDescription: () => {
      return {
        Description: value,
      };
    },
  }));
  return (
    <div className="mt-3">
      <div className="flex justify-center font-semibold mb-4 underline">
        Mô tả
      </div>
      <div>
        <ReactQuill
          modules={modules}
          theme="snow"
          value={value}
          onChange={setValue}
        />
      </div>
    </div>
  );
});
