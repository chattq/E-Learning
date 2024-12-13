import VideoPlayer from "../../../../../packages/components/VideoPlayer/VideoPlayer";
import { nanoid } from "nanoid";
import { Dropdown, MenuProps } from "antd";
import { uniqBy } from "lodash";

export default function ListUserRoom({
  listUser,
  onTurnOffMicUser,
  onTurnOffCameraUserOther,
  isOwner,
}: any) {
  const generateItems = (item: any): MenuProps["items"] => {
    if (isOwner) {
      return [
        {
          key: "1",
          label: <div>{item.userId}</div>,
        },
        {
          key: "2",
          label: <div>Tắt mic</div>,
          // onClick: () => {
          //   onTurnOffMicUser(item.peerId);
          // },
        },
        {
          key: "3",
          label: <div>Tắt camera</div>,
          onClick: () => {
            onTurnOffCameraUserOther(item);
          },
        },
        {
          key: "3",
          label: <div>Cho phép chia sẻ màn hình</div>,
        },
      ];
    } else {
      return [
        {
          key: "1",
          label: <div>{item.userId}</div>,
        },
      ];
    }
  };

  console.log("listUser", listUser);

  return (
    <div className="grid grid-cols-6 gap-2 px-2 py-2">
      {uniqBy(listUser, "userId")?.map((item: any) => {
        const items = generateItems(item);
        if (!item.isCameraOn)
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
                  <img
                    src="https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black-thumbnail.png"
                    alt=""
                    className="h-full w-full"
                  />
                </div>
              </Dropdown>
            </>
          );

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
                <VideoPlayer className="h-full w-full " stream={item.stream} />
              </div>
            </Dropdown>
          </>
        );
      })}
    </div>
  );
}
