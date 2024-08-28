import React, { useEffect, useRef, useState } from "react";
import "./test-antd.scss";
import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  addDays,
  subDays,
} from "date-fns";
import { nanoid } from "nanoid";
import { getTasksUserCode, pushData } from "./handle-logic";

export default function TestAntd() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const ref = useRef<any>(null);
  const [userGetTask, setUserGetTask] = useState<any>("");
  // Bắt đầu của tuần (thứ 2)

  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
  // Kết thúc của tuần (chủ nhật)
  const endDate = endOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: startDate, end: endDate });
  // Tạo một mảng chứa tất cả các ngày trong tuần
  const [dataDefaults, setDataDefaults] = useState<any>([]);
  useEffect(() => {
    const dayNames = [
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7",
      "Chủ nhật",
    ];
    setDataDefaults(
      [
        {
          id: 1,
          dataTask: [
            {
              UserName: "Quang1",
              UserCode: "Quang1",
              TaskList: [
                {
                  TaskID: "UnassignedTask1",
                  TaskName: "Hà Nội",
                },
                {
                  TaskID: "UnassignedTask2",
                  TaskName: "Bắc Ninh",
                },
              ],
            },
            {
              UserName: "Quang2",
              UserCode: "Quang2",
              TaskList: [
                {
                  TaskID: "UnassignedTask2",
                  TaskName: "Bắc Ninh",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          dataTask: [
            {
              UserName: "Quang1",
              UserCode: "Quang1",
              TaskList: [],
            },
            {
              UserName: "Quang2",
              UserCode: "Quang2",
              TaskList: [
                {
                  TaskID: "UnassignedTask1",
                  TaskName: "Hà Nội",
                },
              ],
            },
          ],
        },
        {
          id: 3,
          dataTask: [
            {
              UserName: "Quang1",
              UserCode: "Quang1",
              TaskList: [
                {
                  TaskID: "UnassignedTask1",
                  TaskName: "Hà Nội",
                },
              ],
            },
            {
              UserName: "Quang2",
              UserCode: "Quang2",
              TaskList: [],
            },
          ],
        },
        {
          id: 4,
          dataTask: [
            {
              UserName: "Quang1",
              UserCode: "Quang1",
              TaskList: [
                {
                  TaskID: "UnassignedTask1",
                  TaskName: "Hà Nội",
                },
              ],
            },
            {
              UserName: "Quang2",
              UserCode: "Quang2",
              TaskList: [
                {
                  TaskID: "UnassignedTask1",
                  TaskName: "Hà Nội",
                },
              ],
            },
          ],
        },
        {
          id: 5,
          dataTask: [
            {
              UserName: "Quang1",
              UserCode: "Quang1",
              TaskList: [
                {
                  TaskID: "UnassignedTask1",
                  TaskName: "Hà Nội",
                },
              ],
            },
            {
              UserName: "Quang2",
              UserCode: "Quang2",
              TaskList: [],
            },
          ],
        },
        {
          id: 6,
          dataTask: [
            {
              UserName: "Quang1",
              UserCode: "Quang1",
              TaskList: [
                {
                  TaskID: "UnassignedTask1",
                  TaskName: "Hà Nội",
                },
              ],
            },
            {
              UserName: "Quang2",
              UserCode: "Quang2",
              TaskList: [
                {
                  TaskID: "UnassignedTask4",
                  TaskName: "Bắc Giang",
                },
              ],
            },
          ],
        },
        {
          id: 7,
          dataTask: [
            {
              UserName: "Quang1",
              UserCode: "Quang1",
              TaskList: [
                {
                  TaskID: "UnassignedTask1",
                  TaskName: "Hà Nội",
                },
                {
                  TaskID: "UnassignedTask4",
                  TaskName: "Bắc Giang",
                },
              ],
            },
            {
              UserName: "Quang2",
              UserCode: "Quang2",
              TaskList: [],
            },
          ],
        },
      ].map((item: any, index: any) => {
        return {
          day: format(weekDays[index], "yyyy-MM-dd"),
          dayName: dayNames[index],
          ...item,
        };
      })
    );
  }, [currentDate]);

  const handleNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };

  const handlePrevWeek = () => {
    setCurrentDate(subDays(currentDate, 7));
  };

  const UnassignedTask = [
    {
      id: "UnassignedTask1",
      name: "Hà Nội",
    },
    {
      id: "UnassignedTask2",
      name: "Bắc Ninh",
    },
    {
      id: "UnassignedTask3",
      name: "Hải Phòng",
    },
    {
      id: "UnassignedTask4",
      name: "Bắc Giang",
    },
  ];

  const handleDrop = (e: any, item: any, dayDrop: any, idColumnDrop: any) => {
    const dataDefaultsCopy = [...dataDefaults];
    const taskIDDrag = JSON.parse(e.dataTransfer.getData("dataDrag")) || [];
    const dataDropCopy = { ...item };
    if (taskIDDrag.mode === "DragTasks") {
      const dataDragAdd = {
        day: dayDrop,
        IDColumnDrop: idColumnDrop,
        UserCode: dataDropCopy.UserCode,
        TaskList: {
          TaskID: taskIDDrag.id,
          TaskName: taskIDDrag.name,
        },
      };
      const indexToUpdate = dataDefaultsCopy.findIndex(
        (item) => item.id === dataDragAdd.IDColumnDrop
      );
      if (indexToUpdate !== -1) {
        const userIndex = dataDefaultsCopy[indexToUpdate].dataTask.findIndex(
          (user: any) => user.UserCode === dataDragAdd.UserCode
        );
        if (userIndex !== -1) {
          // Kiểm tra xem TaskID đã tồn tại trong TaskList chưa
          const taskIndex = dataDefaultsCopy[indexToUpdate].dataTask[
            userIndex
          ].TaskList.findIndex(
            (task: any) => task.TaskID === dataDragAdd.TaskList.TaskID
          );
          if (taskIndex === -1) {
            // TaskID chưa tồn tại, thêm task vào TaskList của User phù hợp
            dataDefaultsCopy[indexToUpdate].dataTask[userIndex].TaskList.push(
              dataDragAdd.TaskList
            );
          } else {
            alert("Đã tồn tại");
          }
        } else {
          // Tạo mới user và thêm task vào TaskList của user đó
          dataDefaultsCopy[indexToUpdate].dataTask.push({
            UserName: dataDragAdd.UserCode,
            UserCode: dataDragAdd.UserCode,
            TaskList: [dataDragAdd.TaskList],
          });
        }
      } else {
        // IDColumnDrop không tồn tại trong mảng data, xử lý tương ứng
        console.error("IDColumnDrop không tồn tại trong mảng data");
      }
      setDataDefaults(dataDefaultsCopy);
    } else {
      const dataDragAdd = {
        day: dayDrop,
        IDColumnDrop: idColumnDrop,
        IDColumnDrag: taskIDDrag.id,
        UserCodeDrop: dataDropCopy.UserCode,
        TaskList: taskIDDrag.TaskList,
        UserCodeDrag: taskIDDrag.UserCodeDrag,
      };
      let isTaskIDDuplicate = false;

      // Bước 1: Tìm và kiểm tra TaskID trùng và ghi nhận vào biến flag
      dataDefaultsCopy.forEach((entry) => {
        if (entry.id === dataDragAdd.IDColumnDrop) {
          entry.dataTask.forEach((task: any) => {
            if (task.UserCode === dataDragAdd.UserCodeDrop) {
              const existingTask = task.TaskList.find(
                (item: any) => item.TaskID === dataDragAdd.TaskList.TaskID
              );
              if (existingTask) {
                isTaskIDDuplicate = true;
              }
            }
          });
        }
      });

      // Bước 2: Nếu TaskID không trùng, thêm phần tử vào TaskList của IDColumnDrop của UserCodeDrop và xóa TaskID của IDColumnDrag của UserCodeDrag
      if (!isTaskIDDuplicate) {
        dataDefaultsCopy.forEach((entry) => {
          if (entry.id === dataDragAdd.IDColumnDrop) {
            entry.dataTask.forEach((task: any) => {
              if (task.UserCode === dataDragAdd.UserCodeDrop) {
                const existingTask = task.TaskList.find(
                  (item: any) => item.TaskID === dataDragAdd.TaskList.TaskID
                );
                if (!existingTask) {
                  task.TaskList.push(dataDragAdd.TaskList);
                }
              }
            });
          }
          if (entry.id === dataDragAdd.IDColumnDrag) {
            entry.dataTask.forEach((task: any) => {
              if (task.UserCode === dataDragAdd.UserCodeDrag) {
                task.TaskList = task.TaskList.filter(
                  (item: any) => item.TaskID !== dataDragAdd.TaskList.TaskID
                );
              }
            });
          }
        });
      } else {
        alert("TaskID đã tồn tại và không thể thêm.");
      }
      setDataDefaults(dataDefaultsCopy);
    }
  };

  const handleDragStart = (e: any, dataTag: any) => {
    e.dataTransfer.setData(
      "dataDrag",
      JSON.stringify({
        mode: "DragTasks",
        ...dataTag,
      })
    );
  };
  const handleDragOver = (e: any) => {
    e.preventDefault();
  };
  const handleDelete = (item: any, idColumn: any, UserCode: any) => {
    const dataDefaultsCopy = [...dataDefaults];
    const dataDelete = {
      TaskIDDelete: item.TaskID,
      TaskNameDelete: item.TaskName,
      IDColumnDelete: idColumn,
      UserCodeDelete: UserCode,
    };
    const index = dataDefaultsCopy.findIndex(
      (day) => day.id === dataDelete.IDColumnDelete
    );
    if (index !== -1) {
      const userIndex = dataDefaultsCopy[index].dataTask.findIndex(
        (user: any) => user.UserCode === dataDelete.UserCodeDelete
      );
      if (userIndex !== -1) {
        dataDefaultsCopy[index].dataTask[userIndex].TaskList = dataDefaultsCopy[
          index
        ].dataTask[userIndex].TaskList.filter(
          (task: any) => task.TaskID !== dataDelete.TaskIDDelete
        );
      }
    }
    setDataDefaults(dataDefaultsCopy);
  };

  const handleDragEnter = (userInfor: any, columnsInfor: any) => {
    setUserGetTask(`${columnsInfor.id + userInfor.UserCode}`);
  };

  const handleDragLeave = () => {
    setUserGetTask(-1); // Đặt lại chỉ mục của ô khi kéo kết thúc
  };
  const handleExit = () => {
    setUserGetTask(-1); // Đặt lại chỉ mục của ô khi kéo kết thúc
  };
  const handleDragStartGrid = (
    e: any,
    item: any,
    userInfor: any,
    idColumn: any,
    UserCodeDrag: any
  ) => {
    e.dataTransfer.setData(
      "dataDrag",
      JSON.stringify({
        mode: "DragGrid",
        id: idColumn,
        TaskList: item,
        UserCode: userInfor.UserCode,
        UserName: userInfor.UserName,
        UserCodeDrag: UserCodeDrag,
      })
    );
  };

  useEffect(() => {
    // Hàm xử lý sự kiện click của document
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setUserGetTask(-1);
      }
    }

    // Gắn sự kiện click vào document
    document.addEventListener("click", handleClickOutside);

    // Xóa sự kiện khi component bị unmount để tránh memory leaks
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex gap-5 " ref={ref}>
        <div>
          <div>bảng task</div>
          {UnassignedTask.map((item: any) => {
            return (
              <div
                key={item.id}
                draggable
                onDragStart={(e: any) => handleDragStart(e, item)}
                onDragLeave={handleDragLeave}>
                <div className="card px-2 mx-3 my-3 bg-slate-500">
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <table>
          <tr>
            <th colSpan={3}>Company</th>
            <th colSpan={3}>
              <div className="flex gap-4">
                <button onClick={handlePrevWeek}>Previous Week</button>

                <h2>
                  Ngày trong tuần từ {format(startDate, "yyyy-MM-dd")} đến
                  {format(endDate, "yyyy-MM-dd")}
                </h2>
                <button onClick={handleNextWeek}>Next Week</button>
              </div>
            </th>
            <th>Country</th>
          </tr>
          <tr>
            {dataDefaults?.map((item: any, index: any) => {
              return <td key={nanoid()}>{`${item.day} / ${item.dayName}`}</td>;
            })}
          </tr>
          {getTasksUserCode(dataDefaults)?.map((item: any, index: any) => {
            return (
              <React.Fragment key={nanoid()}>
                <tr>
                  <td colSpan={7}>{item.TaskList.UserName}</td>
                </tr>
                <tr>
                  {dataDefaults.map((val: any, index: any) => {
                    const dataByDay = item.TaskList[val.day];
                    return (
                      <React.Fragment key={nanoid()}>
                        <td
                          className="hover:bg-orange-200"
                          onDrop={(e) => handleDrop(e, item, val.day, val.id)}
                          onDragOver={(e) => handleDragOver(e)}
                          onDragEnter={() => handleDragEnter(item, val)}
                          style={{
                            backgroundColor:
                              userGetTask === `${val.id + item.UserCode}`
                                ? "orange"
                                : "white",
                          }}
                          onDragExit={handleExit}>
                          <div>
                            {dataByDay.map((task: any) => {
                              return (
                                <div
                                  key={nanoid()}
                                  style={{
                                    background: "blue",
                                    padding: "5px",
                                    margin: "5px",
                                  }}
                                  onDragOver={(e) => handleDragOver(e)}
                                  onDragStart={(e) =>
                                    handleDragStartGrid(
                                      e,
                                      task,
                                      val.day,
                                      val.id,
                                      item.TaskList.UserName
                                    )
                                  }
                                  draggable>
                                  <div>{task.TaskName}</div>
                                  <div
                                    className="cursor-pointer"
                                    onClick={() =>
                                      handleDelete(
                                        task,
                                        val.id,
                                        item.TaskList.UserName
                                      )
                                    }>
                                    X
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </td>
                      </React.Fragment>
                    );
                  })}
                </tr>
              </React.Fragment>
            );
          })}
        </table>
      </div>
    </>
  );
}
