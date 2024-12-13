import { Input } from "antd";
import { SearchProps } from "antd/es/input";
import React, { useState } from "react";

interface IListPeopleRoom {
  listUser: any;
  profileUser?: any;
  userID: string;
}

export default function ListPeopleRoom({
  listUser,
  profileUser,
  userID,
}: IListPeopleRoom) {
  const { Search } = Input;
  const [searchTerm, setSearchTerm] = useState("");

  // Hàm xử lý khi người dùng tìm kiếm
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Lọc danh sách người dùng dựa trên từ khóa tìm kiếm
  const filteredList = listUser?.filter(
    (item: any) =>
      item.userId !== profileUser?.id &&
      item.userId.toLowerCase().includes(searchTerm)
  );

  return (
    <>
      {/* <Search
        placeholder="Tìm kiếm"
        onChange={onSearchChange}
        style={{ padding: 10 }}
      /> */}
      <div className="border-[1px] rounded flex gap-2">
        <div>Tôi:</div>
        <div>
          <div className="text-[12px]">{profileUser?.name}</div>
          <div className="text-[12px]">{profileUser?.id}</div>
        </div>
      </div>
      <div></div>
      {filteredList
        ?.filter((val: any) => val.approved === true)
        ?.map((item: any) => (
          <div
            key={item.peerId}
            className="flex items-center justify-between"
            style={{ width: "100%" }}>
            <div className="border-[1px] rounded">
              <div className="text-[12px]">{item.dataUser.name}</div>
              <div className="text-[12px]">{item.dataUser.id}</div>
            </div>
          </div>
        ))}
    </>
  );
}
