import { useState } from "react";
import "./course-description.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import ReactQuill from "react-quill";

export default function CourseDescription() {
  const [value, setValue] = useState("");
  return (
    <div className="mt-3">
      <div className="flex justify-center font-semibold mb-4 underline">
        Mô tả
      </div>
      <div>
        <ReactQuill theme="snow" value={value} onChange={setValue} />
      </div>
    </div>
  );
}
