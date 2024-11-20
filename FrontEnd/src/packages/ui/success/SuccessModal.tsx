import { Modal } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SuccessModal = () => {
  const [modal, contextHolder] = Modal.useModal();
  const navigate = useNavigate();

  const showSuccessModal = () => {
    let secondsToGo = 5;

    const instance = modal.success({
      title: "Thanh toán thành công!",
      content: `Chúc mừng bạn đã mua được khóa học`,
      onOk: () => navigate("/"), // Điều hướng khi nhấn OK
      onCancel: () => navigate("/"), // Điều hướng khi nhấn Cancel
    });

    const timer = setInterval(() => {
      secondsToGo -= 1;
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      instance.destroy();
      navigate("/"); // Điều hướng khi hết thời gian
    }, secondsToGo * 1000);
  };

  useEffect(() => {
    showSuccessModal();
  }, []);

  return <>{contextHolder}</>;
};

export default SuccessModal;
