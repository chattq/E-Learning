import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Button, Modal } from "antd";
import { useWindowSize } from "../../../../../packages/hooks/useWindowSize";
import { useNavigate } from "react-router-dom";

export const PopupCall = forwardRef(({}, ref: any) => {
  const [open, setOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  useImperativeHandle(ref, () => ({
    showPopup() {
      setOpen(true);
    },
  }));
  const onHidding = () => {
    setOpen(false);
  };
  const handleEnlargeScreen = () => {
    setIsFullScreen(true);
  };
  const customTitle = (
    <div style={{ color: "blue", fontSize: "20px" }}>
      <Button onClick={handleEnlargeScreen}>Phóng to</Button>
    </div>
  );
  const windowSize = useWindowSize();
  const nav = useNavigate();
  return (
    <Modal
      title={customTitle}
      centered
      open={open}
      mask={false}
      onOk={() => nav("/admin/Course_online/room/3352")}
      onCancel={onHidding}>
      <div>a</div>
    </Modal>
  );
});
