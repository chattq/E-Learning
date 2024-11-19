import { Input } from "antd";
import { SearchProps } from "antd/es/input";
import React, { useState } from "react";

interface IListPeopleRoom {
  listUser: any;
  peerId: string;
  userID: string;
}

export default function ListPeopleRoom({
  listUser,
  peerId,
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
      item.peerId !== peerId && item.peerId.toLowerCase().includes(searchTerm)
  );
  return (
    <>
      <Search
        placeholder="Tìm kiếm"
        onChange={onSearchChange}
        style={{ padding: 10 }}
      />
      <div>Tôi:{userID}</div>
      {filteredList.map((item: any) => (
        <div
          key={item.peerId}
          className="flex items-center justify-between"
          style={{ width: "100%" }}>
          <div className="text-[12px]">{item.peerId}</div>
        </div>
      ))}
    </>
  );
}
