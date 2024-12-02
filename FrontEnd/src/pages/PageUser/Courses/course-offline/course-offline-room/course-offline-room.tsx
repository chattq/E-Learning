import { Button, Collapse, CollapseProps } from "antd";
import { useWindowSize } from "../../../../../packages/hooks/useWindowSize";
import { nanoid } from "nanoid";
import ReactPlayer from "react-player";
import "./course-offline-room.scss";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { IoSend } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useConfigAPI } from "../../../../../packages/api/config-api";
import { useQuery } from "@tanstack/react-query";
import {
  DownOutlined,
  LeftOutlined,
  PlayCircleOutlined,
  RightOutlined,
} from "@ant-design/icons";

export default function Course_Offline_Room() {
  const windowSize = useWindowSize();
  const [isExpanded, setIsExpanded] = useState(false);
  const [handleOpen, setHandleOpen] = useState(false);
  const [linkVideo, setLinkVideo] = useState("");
  const [videoRemark, setVideoRemark] = useState("");
  const [infoVideo, setInfoVideo] = useState<any>({});
  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const nav = useNavigate();
  const param = useParams();
  const api = useConfigAPI();

  const { data: Course_Detail, isLoading } = useQuery({
    queryKey: ["Course_Detail_Video", param.idCourse],
    queryFn: async () => {
      const response = await api.Course_Detail(param.idCourse);
      if (response.isSuccess) {
        return response.data;
      } else {
        console.log(response);
      }
    },
  });

  const handleVideo = (u: any) => {
    setInfoVideo(u);
  };

  const backHomePage = () => {
    nav("/");
  };

  return (
    <div
      style={{
        height: windowSize.height - 50.1,
      }}
    >
      <div className="h-[50px] header-video-course ">
        <LeftOutlined onClick={backHomePage} />
        <div
          style={{
            paddingLeft: "15px",
          }}
        >
          {" "}
          {Course_Detail?.InforCourse.course_name}
        </div>
      </div>

      <div className="flex h-full">
        <div className="w-[calc(100%-340px)] bg-[#fff] overflow-y-scroll">
          <ReactPlayer
            width={"100%"}
            height={"750px"}
            url={
              infoVideo?.course_lesson_LinkVideo
                ? infoVideo?.course_lesson_LinkVideo
                : "https://www.youtube.com/watch?v=MMgPOQ9gJhM"
            }
            controls={true}
          />
          <div className="px-[40px]">
            <div className="bg-[#F2F2F2] mt-8 rounded-xl">
              <div className="px-4 py-2">
                <h2 className="title-video-course-item">
                  {infoVideo?.course_lesson_name}
                </h2>
                <div
                  className={`${
                    isExpanded ? "line-clamp-none" : "line-clamp-4"
                  } overflow-hidden `}
                  dangerouslySetInnerHTML={{
                    __html: infoVideo?.course_lesson_Remark ?? "",
                  }}
                />

                <span
                  onClick={toggleReadMore}
                  style={{
                    color: "blue",
                    cursor: "pointer",
                    display: infoVideo?.course_lesson_Remark ? "block" : "none",
                  }}
                >
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
          {Course_Detail?.InforCourse?.course_chapter.map((e: any) => {
            return (
              <>
                <div
                  className="course-content-title-parent"
                  onClick={() => setHandleOpen(!handleOpen)}
                >
                  {handleOpen ? (
                    <DownOutlined
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        marginRight: "10px",
                        color: "#bb0000",
                      }}
                    />
                  ) : (
                    <RightOutlined
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        marginRight: "10px",
                        color: "#bb0000",
                      }}
                    />
                  )}
                  {e.course_chapter_name}
                </div>
                {e.course_lesson.map((v: any) => {
                  return (
                    <div
                      className="course-content-title-child"
                      style={{
                        display: handleOpen ? "block" : "none",
                      }}
                      onClick={(u) => handleVideo(v)}
                    >
                      <PlayCircleOutlined
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          marginRight: "10px",
                          color: "#bb0000",
                        }}
                      />{" "}
                      {v.course_lesson_name}
                    </div>
                  );
                })}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
