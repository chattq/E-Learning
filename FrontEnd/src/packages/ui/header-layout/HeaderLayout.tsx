import { BellFilled, UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Dropdown, Input, MenuProps, Space } from "antd";
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

  return (
    <>
      <div className="w-[26%] ml-5">
        <Input placeholder="Search..." />
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
