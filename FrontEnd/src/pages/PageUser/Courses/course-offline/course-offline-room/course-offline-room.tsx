import { Button, Collapse, CollapseProps } from "antd";
import { useWindowSize } from "../../../../../packages/hooks/useWindowSize";
import { nanoid } from "nanoid";
import ReactPlayer from "react-player";
import "./course-offline-room.scss";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { IoSend } from "react-icons/io5";

export default function Course_Offline_Room() {
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <div>
          <div className="font-bold text-[16px]">1. Giới thiệu</div>
          <div className="text-[12px] font-normal">0/3 | 15:00</div>
        </div>
      ),
      children: (
        <div className="flex flex-col">
          <div className="px-[24px] bg-[#f01e1e99] pb-[5px] pt-[5px] hover:bg-[#f4999999] cursor-pointer">
            <div className="font-medium">1. Giới thiệu môn học</div>
            <div className="text-[12px] font-normal">14:00</div>
          </div>
          <div className="px-[24px] pb-[5px] pt-[5px] hover:bg-[#f4999999] cursor-pointer">
            <div className="font-medium">2. Vòng lặp trong JavaScript</div>
            <div className="text-[12px] font-normal">14:00</div>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div>
          <div className="font-bold text-[16px]">2. JavaScript là gì?</div>
          <div className="text-[12px] font-normal">1/3 | 15:00</div>
        </div>
      ),
      children: (
        <div className="flex flex-col">
          <div className="px-[24px] pb-[5px] pt-[5px] hover:bg-[#f4999999] cursor-pointer">
            <div className="font-medium">1. Giới thiệu môn học</div>
            <div className="text-[12px] font-normal">14:00</div>
          </div>
          <div className="px-[24px] pb-[5px] pt-[5px] hover:bg-[#f4999999] cursor-pointer">
            <div className="font-medium">2. Vòng lặp trong JavaScript</div>
            <div className="text-[12px] font-normal">14:00</div>
          </div>
        </div>
      ),
    },
    {
      key: nanoid(),
      label: (
        <div>
          <div className="font-bold text-[16px]">2. JavaScript là gì?</div>
          <div className="text-[12px] font-normal">1/3 | 15:00</div>
        </div>
      ),
      children: (
        <div className="flex flex-col">
          <div className="px-[24px] pb-[5px] pt-[5px] hover:bg-[#f4999999] cursor-pointer">
            <div className="font-medium">1. Giới thiệu môn học</div>
            <div className="text-[12px] font-normal">14:00</div>
          </div>
          <div className="px-[24px] pb-[5px] pt-[5px] hover:bg-[#f4999999] cursor-pointer">
            <div className="font-medium">2. Vòng lặp trong JavaScript</div>
            <div className="text-[12px] font-normal">14:00</div>
          </div>
        </div>
      ),
    },
  ];
  const windowSize = useWindowSize();

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const htmlContent = `
 <p>Đây là đoạn văn bản rất dài mà bạn muốn rút gọn khi hiển thị. Đoạn văn này có thể chứa các thẻ HTML như <strong>strong</strong>, <em>italic</em>, hoặc <a href="#">link</a>.</p>
    <p>Đây là đoạn thứ hai, và có thể chứa nhiều thông tin quan trọng.</p>
    <p>Đây là đoạn thứ ba. Bạn có thể tiếp tục thêm các nội dung khác vào đây.</p>
    <p>Đây là đoạn thứ ba. Bạn có thể tiếp tục thêm các nội dung khác vào đây.</p>
    <p>Đây là đoạn thứ ba. Bạn có thể tiếp tục thêm các nội dung khác vào đây.</p>
    <p>Đây là đoạn thứ ba. Bạn có thể tiếp tục thêm các nội dung khác vào đây.</p>
    <p>Đây là đoạn thứ ba. Bạn có thể tiếp tục thêm các nội dung khác vào đây.</p>
`;

  return (
    <div
      style={{
        height: windowSize.height - 50.1,
      }}>
      <div className="h-[50px] bg-slate-400">header</div>

      <div className="flex h-full">
        <div className="w-[calc(100%-340px)] bg-[#fff] overflow-y-scroll">
          <ReactPlayer
            width={"100%"}
            height={"550px"}
            url="https://www.youtube.com/watch?v=MMgPOQ9gJhM"
            controls={true}
          />
          <div className="px-[40px]">
            <div className="bg-[#F2F2F2] mt-8 rounded-xl">
              <div className="px-4 py-2">
                <div
                  className={`${
                    isExpanded ? "line-clamp-none" : "line-clamp-4"
                  } overflow-hidden `}
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
                <span
                  onClick={toggleReadMore}
                  style={{ color: "blue", cursor: "pointer" }}>
                  {isExpanded ? "Ẩn bớt" : "Xem thêm"}
                </span>
              </div>
            </div>
            <div className="mt-4 mb-7">
              <div className="font-bold text-[24px]">Bình luận</div>
              <div className="flex gap-5 mt-5 w-full">
                <div className="rounded-full  h-[45px] w-[45px] overflow-hidden">
                  <img
                    src="https://st.quantrimang.com/photos/image/2023/02/16/Anh-meo-lien-quan-13.jpg"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="w-full flex-1">
                  <TextArea
                    placeholder="Viết bình luận"
                    className="Input_comment border-none outline-none  shadow-none"
                    autoSize
                  />
                  <div className="flex justify-end p-2 ">
                    <IoSend size={20} color="#b1b2b5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[340px] flex-1 overflow-y-scroll bg-[#fff] border-l-[1px]">
          <Collapse
            activeKey={items.map((item: any) => item.key)}
            className="Collapse_course_offline"
            style={{
              width: "100%",
            }}
            expandIconPosition={"end"}
            items={items}
            bordered={false}
          />
        </div>
      </div>
    </div>
  );
}
