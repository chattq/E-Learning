import React from "react";
import { IoMdClose } from "react-icons/io";
import "./style.scss";

interface ILayoutSideBar {
  children: React.ReactNode;
  title: string;
  onClick?: () => void;
}
export default function LayoutSideBar({
  children,
  title,
  onClick,
}: ILayoutSideBar) {
  return (
    <div className="bg-[#ffff] border-l-[2px] w-[325px]">
      <div className="layout_chat ">
        <div className="flex items-center justify-between px-4 py-4 border-b-[1px]">
          <h1 className="text-[17px] font-bold">{title}</h1>
          <div className="cursor-pointer" onClick={onClick}>
            <IoMdClose size={20} />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
