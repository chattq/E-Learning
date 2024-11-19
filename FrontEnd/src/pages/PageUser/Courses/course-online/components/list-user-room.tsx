import React from "react";
import { deleteKeyFromObject } from "../CourseRoom";
import VideoPlayer from "../../../../../packages/components/VideoPlayer/VideoPlayer";
import { nanoid } from "nanoid";
import { Dropdown, MenuProps } from "antd";

export default function ListUserRoom({ peers, peerId }: any) {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <div>{peerId}</div>,
    },
    {
      key: "2",
      label: <div>Tắt mic</div>,
    },
    {
      key: "3",
      label: <div>Cho phép chia sẻ màn hình</div>,
    },
  ];
  return (
    <div className="grid grid-cols-6 gap-2 px-2 py-2">
      {Object.values(deleteKeyFromObject(peers, peerId)).map((item: any) => {
        if (!item.isCameraOn) return <></>;
        console.log(10, item);
        return (
          <>
            <Dropdown
              menu={{ items }}
              align={{
                offset: [0, -10],
              }}
              arrow={{ pointAtCenter: false }}>
              <div
                key={item.peerId}
                className="rounded-md overflow-hidden cursor-pointer">
                {item.isCameraOn ? (
                  <VideoPlayer
                    className="h-full w-full "
                    stream={item.stream}
                  />
                ) : (
                  <img
                    src="https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black-thumbnail.png"
                    alt=""
                    className="h-full w-full"
                  />
                )}
              </div>
            </Dropdown>
          </>
        );
      })}
    </div>
  );
}
