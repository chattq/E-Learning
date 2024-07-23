import React from "react";

interface IListPeopleRoom {
  listUser: any;
  peerId: string;
}

export default function ListPeopleRoom({ listUser, peerId }: IListPeopleRoom) {
  return (
    <>
      <div>Tôi:{peerId}</div>
      {listUser
        .filter((item: any) => item.peerId !== peerId)
        .map((item: any) => {
          return (
            <div
              className="flex items-center justify-between"
              style={{ width: "100%" }}>
              <div className="text-[12px]">{item.peerId}</div>
            </div>
          );
        })}
    </>
  );
}
