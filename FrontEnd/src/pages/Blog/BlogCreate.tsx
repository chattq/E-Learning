import { useState } from "react";
import UserPageLayout from "../../packages/layouts/user-page-layout/user-page-layout";
import ReactQuill from "react-quill";
import { Button, Input, Upload, UploadProps, message } from "antd";
import { useWindowSize } from "../../packages/hooks/useWindowSize";
import "./Blog.scss";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useConfigAPI } from "../../packages/api/config-api";

export default function BlogCreate() {
  const [value, setValue] = useState(""); // Nội dung bài viết
  const [title, setTitle] = useState(""); // Tiêu đề bài viết
  const [coverImage, setCoverImage] = useState<string | null>(null); // URL của ảnh bìa
  const [uploadedFile, setUploadedFile] = useState<any>(null); // Thông tin file upload
  const windowSize = useWindowSize();
  const nav = useNavigate();
  const api = useConfigAPI();
  const [messageApi, contextHolder] = message.useMessage();

  const modules = {
    toolbar: [
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" },
      ],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const props: UploadProps = {
    name: "file",
    action: "http://localhost:4000/medias/upload-images",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      console.log("info", info); // Log toàn bộ thông tin để kiểm tra response

      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);

        // Kiểm tra response
        if (info.file.response && info.file.response.isSuccess) {
          console.log("Upload response:", info.file.response); // Log response từ server

          // Kiểm tra cấu trúc response và lấy URL
          const fileUrl = info.file.response.data.FileUrl;
          if (fileUrl) {
            setCoverImage(fileUrl); // Lưu URL của ảnh bìa
          } else {
            message.error("Không tìm thấy URL của file trong response.");
          }
        } else {
          message.error("Response từ server không thành công.");
        }
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const onCreateBlog = async () => {
    if (!title || !value) {
      message.error("Vui lòng nhập đầy đủ thông tin bài viết!");
      return;
    }

    const blogData = {
      title: title,
      content: value,
      blog_image: coverImage, // URL của ảnh bìa
      uploadedFile, // Thông tin file đã upload
    };

    console.log("blogdata", blogData);
    const response = await api.Blogs_Create(blogData);
    console.log("response", response);
    if (response.isSuccess) {
      messageApi.open({
        type: "success",
        content: "This is a success message",
      });
    } else {
      console.log(response);
      messageApi.open({
        type: "error",
        content: "This is an error message",
      });
    }
  };

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
              className="mb-3 px-1 w-full font-bold border-none focus:outline-none focus:border-none focus:shadow-none text-[28px] outline-none"
              placeholder="Nhập tiêu đề"
              value={title}
              onChange={(e) => setTitle(e.target.value)} // Lưu giá trị tiêu đề
            />
            <Upload className="btnUploadFile" {...props}>
              <Button icon={<UploadOutlined />}>Ảnh bìa</Button>
            </Upload>
            <ReactQuill
              placeholder="Nội dung nhập ở đây"
              style={{
                marginTop: "30px",
                background: "#fff",
                height: windowSize.height - 233,
                width: "100%",
              }}
              modules={modules}
              theme="snow"
              value={value}
              onChange={setValue} // Lưu nội dung bài viết
            />
          </div>
          <div className="w-[50%]">
            <div className="border-b-[1px] py-[10px] flex justify-between">
              <div className="text-[20px] ml-4 font-bold">Preview</div>
              <Button onClick={() => onCreateBlog()}>Lưu bài viết</Button>
            </div>
            <div
              className="overflow-y-scroll py-1 px-5 scroll-blog"
              style={{
                height: windowSize.height - 168,
              }}>
              {coverImage && (
                <img
                  src={coverImage}
                  alt="Cover"
                  style={{ width: "100%", marginBottom: "20px" }}
                />
              )}
              <h2>{title}</h2>
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
