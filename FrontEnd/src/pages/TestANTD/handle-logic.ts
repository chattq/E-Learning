export const getAllUniqueUserCodes = (data: any) => {
  let dataUser: any = [];
  let addedUserCodes: any = [];

  data?.forEach((val: any) => {
    val?.dataTask.forEach((user: any, index: any) => {
      if (!addedUserCodes.includes(user.UserCode)) {
        addedUserCodes.push(user.UserCode);
        dataUser.push({
          UserName: user.UserName,
          UserCode: user.UserCode,
        });
      }
    });
  });

  return dataUser;
};
export const getTasksByUserCode = (data: any) => {
  const tasksByUserCode: any = {};
  const uniqueDays: any = {};
  data?.forEach((item: any) => {
    item.dataTask.forEach((task: any) => {
      const userCode = task.UserCode;
      if (!tasksByUserCode[userCode]) {
        tasksByUserCode[userCode] = {};
      }
      tasksByUserCode[userCode][item.day] = task.TaskList;
    });
  });

  // Chuyển đổi đối tượng thành mảng

  Object.entries(tasksByUserCode)
    .map(([userCode, tasks]) => ({
      UserCode: userCode,
      TasksByDay: tasks as any,
    }))
    .forEach((item) => {
      const userCode = item.UserCode;
      const tasksByDay = item.TasksByDay;
      Object.keys(tasksByDay).forEach((day) => {
        if (!uniqueDays[day]) {
          uniqueDays[day] = {}; // Tạo một đối tượng mới nếu ngày chưa tồn tại
        }
        if (!uniqueDays[day][userCode]) {
          uniqueDays[day][userCode] = tasksByDay[day]; // Gán danh sách nhiệm vụ cho ngày và người dùng tương ứng
        } else {
          uniqueDays[day][userCode] = uniqueDays[day][userCode].concat(
            tasksByDay[day]
          ); // Nếu ngày đã tồn tại, nối danh sách nhiệm vụ
        }
      });
    });
  return Object.entries(uniqueDays).map(([day, tasksByUser]) => ({
    Day: day as any,
    TasksByUser: (tasksByUser as any) ?? [],
  }));
};

///////////////////////// trên cần xóa
export const mergeDataGridAdd = (dataAdd: any, dataItem: any) => {
  // Function to check if a TaskID exists in a given TaskList
  const isTaskIDExist = (taskList: any, taskId: any) => {
    return taskList?.some((task: any) => task.TaskID === taskId);
  };

  // Find the index of the dataTask with given UserCode
  const dataIndex = dataItem?.dataTask?.findIndex(
    (item: any) => item.UserCode === dataAdd.UserCode
  );

  if (dataIndex !== -1) {
    // If UserCode exists, merge TaskList ensuring no duplicate TaskIDs
    dataAdd?.TaskList.forEach((task: any) => {
      if (!isTaskIDExist(dataItem?.dataTask[dataIndex].TaskList, task.TaskID)) {
        dataItem?.dataTask[dataIndex].TaskList.push(task);
      }
    });
  } else {
    // If UserCode does not exist, add a new object to dataTask
    const newData = {
      UserName: dataAdd.UserName,
      UserCode: dataAdd.UserCode,
      TaskList: dataAdd.TaskList,
    };
    dataItem?.dataTask.push(newData);
  }

  return dataItem;
};

export const getTasksUserCode = (data: any) => {
  const tasksByUserCode: any = {}; // Tạo một đối tượng để lưu trữ danh sách task theo UserCode

  data?.forEach((item: any) => {
    item.dataTask.forEach((task: any) => {
      const userCode = task.UserCode;
      const userName = task.UserName;
      if (!tasksByUserCode[userCode]) {
        tasksByUserCode[userCode] = []; // Thay đổi thành một mảng để lưu trữ nhiều TaskList
      }

      const taskList = {
        UserName: userName,
        [item.day]: task.TaskList, // Lưu trữ danh sách task theo ngày
      };

      tasksByUserCode[userCode].push(taskList); // Thêm taskList vào mảng tương ứng với UserCode
    });
  });

  const dataOutput: any = [];

  for (const userCode in tasksByUserCode) {
    const taskListArray = tasksByUserCode[userCode];
    const userTasks: any = {
      UserCode: userCode,
      TaskList: {},
    };

    taskListArray.forEach((taskList: any) => {
      for (const day in taskList) {
        userTasks.TaskList[day] = taskList[day];
      }
    });

    dataOutput.push(userTasks);
  }

  return dataOutput;
};
export const pushData = (data: any, dataADD: any) => {
  // Tìm phần tử có IDColumnDrop và UserCode phù hợp
  const targetDay = data?.find(
    (item: any) =>
      item.id === dataADD?.IDColumnDrop &&
      item.dataTask.some((task: any) => task.UserCode === dataADD.UserCode)
  );

  // Nếu tìm thấy phần tử phù hợp
  if (targetDay) {
    // Tìm phần tử trong dataTask có UserCode phù hợp
    const targetUserTask = targetDay.dataTask?.find(
      (task: any) => task.UserCode === dataADD.UserCode
    );

    // Đẩy dữ liệu từ dataADD vào TaskList của phần tử tìm được
    if (targetUserTask) {
      targetUserTask.TaskList.push(dataADD.TaskList);
    }
  }
};
