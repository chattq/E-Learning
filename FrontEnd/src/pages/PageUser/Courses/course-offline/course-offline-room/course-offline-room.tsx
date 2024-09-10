import { SettingOutlined } from "@ant-design/icons";
import { Collapse, CollapseProps } from "antd";

import { useWindowSize } from "../../../../../packages/hooks/useWindowSize";
import { nanoid } from "nanoid";
import ReactPlayer from "react-player";

export default function Course_Offline_Room() {
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const genExtra = () => (
    <SettingOutlined
      onClick={(event) => {
        // If you don't want click extra trigger collapse, you can prevent this:
        event.stopPropagation();
      }}
    />
  );

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "This is panel header 1",
      children: <div>{text}</div>,
      extra: genExtra(),
    },
    {
      key: "2",
      label: "This is panel header 2",
      children: <div>{text}</div>,
      extra: genExtra(),
    },
    {
      key: nanoid(),
      label: "This is panel header 3",
      children: <div>{text}</div>,
      extra: genExtra(),
    },
    {
      key: nanoid(),
      label: "This is panel header 3",
      children: <div>{text}</div>,
      extra: genExtra(),
    },
    {
      key: nanoid(),
      label: "This is panel header 3",
      children: <div>{text}</div>,
      extra: genExtra(),
    },
    {
      key: nanoid(),
      label: "This is panel header 3",
      children: <div>{text}</div>,
      extra: genExtra(),
    },
    {
      key: nanoid(),
      label: "This is panel header 3",
      children: <div>{text}</div>,
      extra: genExtra(),
    },
    {
      key: nanoid(),
      label: "This is panel header 3",
      children: <div>{text}</div>,
      extra: genExtra(),
    },
    {
      key: nanoid(),
      label: "This is panel header 3",
      children: <div>{text}</div>,
      extra: genExtra(),
    },
    {
      key: nanoid(),
      label: "This is panel header 3",
      children: <div>{text}</div>,
      extra: genExtra(),
    },
    {
      key: nanoid(),
      label: "This is panel header 3",
      children: <div>{text}</div>,
      extra: genExtra(),
    },
    {
      key: nanoid(),
      label: "This is panel header 3",
      children: <div>{text}</div>,
      extra: genExtra(),
    },
    {
      key: nanoid(),
      label: "This is panel header 3",
      children: <div>{text}</div>,
      extra: genExtra(),
    },
    {
      key: nanoid(),
      label: "This is panel header 3",
      children: <div>{text}</div>,
      extra: genExtra(),
    },
  ];
  const windowSize = useWindowSize();
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
            url="https://www.youtube.com/watch?v=ABvUHh71hcY"
            controls={true}
          />
          <div className="">
            <div>
              <div>Ghi chú</div>
              <div className="bg-slate-200 mt-2">
                <div>
                  If you are using pip you may want to use stopOnUnmount={false}{" "}
                  to continue playing in picture-in-picture mode even after
                  ReactPlayer unmounts
                </div>
              </div>
            </div>
            <div>
              <div>Bình luận</div>
              <div className="bg-slate-200 mt-2">
                <div>
                  If you are using pip you may want to use stopOnUnmount={false}{" "}
                  to continue playing in picture-in-picture mode even after
                  ReactPlayer unmounts
                </div>
                <div>
                  If you are using pip you may want to use stopOnUnmount={false}{" "}
                  to continue playing in picture-in-picture mode even after
                  ReactPlayer unmounts
                </div>
                <div>
                  If you are using pip you may want to use stopOnUnmount={false}{" "}
                  to continue playing in picture-in-picture mode even after
                  ReactPlayer unmounts
                </div>
                <div>
                  If you are using pip you may want to use stopOnUnmount={false}{" "}
                  to continue playing in picture-in-picture mode even after
                  ReactPlayer unmounts
                </div>
                <div>
                  If you are using pip you may want to use stopOnUnmount={false}{" "}
                  to continue playing in picture-in-picture mode even after
                  ReactPlayer unmounts
                </div>
                <div>
                  If you are using pip you may want to use stopOnUnmount={false}{" "}
                  to continue playing in picture-in-picture mode even after
                  ReactPlayer unmounts
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[340px] flex-1 overflow-y-scroll">
          <Collapse
            style={{
              width: "100%",
            }}
            defaultActiveKey={["1"]}
            onChange={onChange}
            expandIconPosition={"end"}
            items={items}
          />
        </div>
      </div>
    </div>
  );
}
