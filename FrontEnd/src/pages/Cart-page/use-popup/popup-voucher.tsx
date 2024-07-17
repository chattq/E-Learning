import { Button, Input, Modal, Space } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useWindowSize } from "../../../packages/hooks/useWindowSize";

export const PopupVoucher = forwardRef(({}, ref: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  useImperativeHandle(ref, () => ({
    showModal() {
      showModal();
    },
  }));

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const windowSize = useWindowSize();
  return (
    <Modal
      title={
        <span style={{ fontSize: "18px", fontWeight: "bold" }}>
          Mã ưu đãi Shop
        </span>
      }
      open={isModalOpen}
      onOk={handleOk}
      width={432}
      style={{ top: 50, bottom: 25 }}
      onCancel={handleCancel}>
      <div className="w-full h-[520px]">
        <div className="flex gap-3 items-center">
          <Input
            className="w-full h-[40px]"
            allowClear
            placeholder="Nhập mã ưu đãi"
          />
          <Button className="h-[40px]">Dùng mã</Button>
        </div>
      </div>
    </Modal>
  );
});
