import { Avatar, Button, List, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { MdMapsHomeWork } from "react-icons/md";
import {
  ButtonEdit,
  ButtonReMove,
  ListItem,
} from "./styleComponentItem/overViewStyle";
import { IoIosSchool, IoMdMail } from "react-icons/io";
import { FaAddressBook, FaTransgender } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { useConfigAPI } from "../../../../../../packages/api/config-api";
import { useQuery } from "@tanstack/react-query";

interface DataType {
  gender?: string;
  name: {
    title?: string;
    first?: string;
    last?: string;
  };
  email?: string;
  picture: {
    large?: string;
    medium?: string;
    thumbnail?: string;
  };
  nat?: string;
  loading: boolean;
}

const count = 5;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const Overview = () => {
  const list = {
    name: "Tuệ",
    gender: "female",
    email: "clara.tremblay@example.com",
    school: "KMA",
    work: "Idocnet",
    adress: "Hà Nội",
    phone: "0364788051",
  };

  const api = useConfigAPI();

  const { data: Get_Profile, isLoading } = useQuery({
    queryKey: ["Get_Profile_User"],
    queryFn: async () => {
      const response = await api.Get_Profile_User();
      if (response.isSuccess) {
        return response.data;
      } else {
        console.log(response);
      }
    },
  });

  return (
    <div>
      <ListItem>
        <div style={{ display: "flex" }}>
          <MdMapsHomeWork style={{ fontSize: "22px" }} />
          <p>
            Họ tên <span>{Get_Profile?.name}</span>
          </p>
        </div>
        {/* <div>
          <ButtonEdit>Sửa</ButtonEdit>
          <ButtonReMove>Xóa</ButtonReMove>
        </div> */}
      </ListItem>
      {/* <ListItem>
        <div style={{ display: "flex" }}>
          <MdMapsHomeWork style={{ fontSize: "22px" }} />
          <p>
            Làm việc tại <span>{list?.work}</span>
          </p>
        </div> */}
      {/* <div>
          <ButtonEdit>Sửa</ButtonEdit>
          <ButtonReMove>Xóa</ButtonReMove>
        </div> */}
      {/* </ListItem> */}
      {/* <ListItem>
        <div style={{ display: "flex" }}>
          <IoIosSchool style={{ fontSize: "22px" }} />
          <p>
            Học tại <span>{list?.school}</span>
          </p>
        </div> */}
      {/* <div>
          <ButtonEdit>Sửa</ButtonEdit>
          <ButtonReMove>Xóa</ButtonReMove>
        </div> */}
      {/* </ListItem> */}
      <ListItem>
        <div style={{ display: "flex" }}>
          <FaAddressBook style={{ fontSize: "22px" }} />
          <p>
            Sống tại <span>{Get_Profile?.address}</span>
          </p>
        </div>
      </ListItem>
      <ListItem>
        <div style={{ display: "flex" }}>
          <IoMdMail style={{ fontSize: "22px" }} />
          <p>
            Email <span>{Get_Profile?.email}</span>
          </p>
        </div>
      </ListItem>
      {/* <ListItem>
        <div style={{ display: "flex" }}>
          <FaTransgender style={{ fontSize: "22px" }} />
          <p>
            Giới tính <span>{list?.gender}</span>
          </p>
        </div>
      </ListItem> */}
      <ListItem>
        <div style={{ display: "flex" }}>
          <FaPhoneAlt style={{ fontSize: "22px" }} />
          <p>
            Số điện thoại <span>{Get_Profile?.phone}</span>
          </p>
        </div>
      </ListItem>
      <ListItem>
        <div style={{ display: "flex" }}>
          <FaPhoneAlt style={{ fontSize: "22px" }} />
          <p>
            Ngày sinh <span>{Get_Profile?.dateOfBirth}</span>
          </p>
        </div>
      </ListItem>

      <ListItem>
        <div style={{ display: "flex" }}>
          <FaPhoneAlt style={{ fontSize: "22px" }} />
          <p>
            Vai trò{" "}
            <span>{Get_Profile?.role == "1" ? "Giáo viên" : "Học sinh"}</span>
          </p>
        </div>
      </ListItem>
    </div>
  );
};

export default Overview;
