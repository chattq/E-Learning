import { BellFilled, UserOutlined } from "@ant-design/icons";
import {
  AutoComplete,
  Avatar,
  Badge,
  Dropdown,
  Input,
  MenuProps,
  Space,
} from "antd";
import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import CartHeader from "../CartHeader/CartHeader";

export default memo(function HeaderLayout() {
  const { pathname } = useLocation();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link to={"/login"}>Login</Link>,
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com">
          2nd menu item
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com">
          3rd menu item
        </a>
      ),
    },
  ];

  const renderTitle = (title: string) => (
    <span>
      {title}
      <a
        style={{ float: "right" }}
        href="https://www.google.com/search?q=antd"
        target="_blank"
        rel="noopener noreferrer">
        more
      </a>
    </span>
  );

  const renderItem = (title: string, count: number) => ({
    value: title,
    label: (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}>
        {title}
        <span>
          <UserOutlined /> {count}
        </span>
      </div>
    ),
  });

  const options = [
    {
      label: renderTitle("Libraries"),
      options: [
        renderItem("AntDesign", 10000),
        renderItem("AntDesign UI", 10600),
      ],
    },
    {
      label: renderTitle("Solutions"),
      options: [
        renderItem("AntDesign UI FAQ", 60100),
        renderItem("AntDesign FAQ", 30010),
      ],
    },
    {
      label: renderTitle("Articles"),
      options: [renderItem("AntDesign design language", 100000)],
    },
  ];
  return (
    <>
      <div className="w-[28%] ml-5">
        <AutoComplete
          popupClassName="certain-category-search-dropdown"
          style={{ width: "100%" }}
          options={options}
          size="large">
          <Input size="large" placeholder="Search..." />
        </AutoComplete>
      </div>
      <Space size={20}>
        {!["payment", "cart"].some((item) =>
          pathname.split("/").includes(item)
        ) && <CartHeader />}
        <Badge count={100} size="default" offset={[0, 0]}>
          <Avatar
            style={{
              backgroundColor: "#e4e6eb",
              color: "black",
              borderRadius: "50%",
            }}
            size={35}
            icon={<BellFilled />}
          />
        </Badge>
        <Dropdown
          align={{
            offset: [-38, 10],
          }}
          trigger={["click"]}
          menu={{ items }}
          placement="bottomLeft"
          arrow={{ pointAtCenter: true }}>
          <Avatar
            size={35}
            style={{
              backgroundColor: "#e4e6eb",
              color: "black",
              borderRadius: "50%",
              cursor: "pointer",
            }}
            icon={<UserOutlined />}
          />
        </Dropdown>
      </Space>
    </>
  );
});
