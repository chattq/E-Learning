import {
  Button,
  Modal,
  Table,
  TableColumnsType,
  TableProps,
  notification,
} from "antd";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { ws } from "../../../../../../socketIO";

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

export const ModalApprove = forwardRef(({ dataRequestApproval }: any, ref) => {
  const [open, setOpen] = useState(false);
  const tableRef = useRef<any>(null);
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (description: any) => {
    api.open({
      message: "Thông báo",
      description: description,
      duration: 1.5,
    });
  };

  useImperativeHandle(ref, () => ({
    setOpenModal: (data: any) => {
      setOpen(true);
    },
  }));
  const showModal = () => {
    setOpen(true);
  };
  console.log(30, dataRequestApproval);

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
  ];

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  const handleApproval = () => {
    if (selectedRowKeys.length > 0) {
      ws.emit("approval-users", selectedRowKeys);
      setOpen(false);
      openNotification("Duyệt thành công");
    } else {
      openNotification("Vui lòng chọn");
    }
  };

  const handleReject = () => {
    if (selectedRowKeys.length > 0) {
      ws.emit("reject-users", selectedRowKeys);
      setOpen(false);
      openNotification("Từ chối thành công");
    } else {
      openNotification("Vui lòng chọn");
    }

    setOpen(false);
  };
  return (
    <>
      <Modal
        title="Duyệt học viên"
        open={open}
        onOk={handleOk}
        width={600}
        style={{
          maxHeight: 400,
        }}
        footer={[
          <Button key="submit" onClick={handleReject}>
            Từ chối
          </Button>,
          <Button key="submit" onClick={handleApproval}>
            Duyệt
          </Button>,
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
        onCancel={handleCancel}>
        <Table<DataType>
          rowSelection={rowSelection}
          showHeader={true}
          ref={tableRef}
          columns={columns}
          rowKey={"id"}
          pagination={false}
          dataSource={dataRequestApproval?.map((item: any) => item.dataUser)}
          scroll={{
            y: 300, // Scroll vertically with height 300px
          }}
          style={{
            maxHeight: 400,
          }}
        />
      </Modal>
      {contextHolder}
    </>
  );
});
