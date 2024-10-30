import { Button, Modal } from "antd";
import { useAtomValue, useSetAtom } from "jotai";
import { clearErrorsAtom, showErrorAtom } from "./error-store";
import { uniqBy } from "lodash";

export interface ErrorItem {
  isSuccess: boolean;
  message: string;
  data: {
    message: string;
  };
}

export default function PopupError() {
  const error = useAtomValue(showErrorAtom);
  const clear = useSetAtom(clearErrorsAtom);

  const handleCancel = () => {
    clear();
  };
  const handleOK = () => {
    clear();
  };

  const errorPopup = () => {
    Modal.error({
      title: "Thông báo lỗi!",
      content: (
        <div>
          {uniqBy(error, "message").map((item: ErrorItem) => {
            return <div>{item.data.message}</div>;
          })}
        </div>
      ),
      centered: true,
      onCancel: handleCancel,
      onOk: handleOK,
    });
  };
  return <>{error.length > 0 && errorPopup()}</>;
}
