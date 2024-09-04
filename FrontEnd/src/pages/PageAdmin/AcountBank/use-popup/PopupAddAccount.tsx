import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Switch,
  Spin,
  Checkbox,
} from "antd";
import { useQuery } from "@tanstack/react-query";
import { useConfigAPI } from "../../../../packages/api/config-api";
import axios from "axios";
import { useSetAtom } from "jotai";
import { LoadingAtom } from "../../../../packages/store/loading.store";

export interface IPopupAddAccountRef {
  showPopup: () => void;
}

export const PopupAddAccount = forwardRef<IPopupAddAccountRef | undefined>(
  ({}, ref) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const formRef = useRef<any>();
    const api = useConfigAPI();
    const [loading, setLoading] = useState(false);

    const { data: listBank, isLoading: loadingListBank } = useQuery({
      queryKey: ["getListBank"],
      queryFn: async () => {
        const response = await api.AccountBank_GetListBank();
        if (response.isSuccess) {
          return response.data.data;
        } else {
          console.log(response);
        }
      },
    });

    useImperativeHandle(ref, () => ({
      showPopup: () => {
        setIsModalOpen(true);
        formRef.current.resetFields();
        // console.log(50, );
      },
    }));
    const handleOk = () => {
      setIsModalOpen(false);
    };

    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const onSave = () => {
      formRef.current?.validateFields().then(async (val: any) => {
        console.log(52, val);
        // const response = await api.AccountBank_Create({
        //   BankCode: val.BankCode,
        //   AccountNumber: val.AccountNumber,
        //   NameAccount: "TRINH QUANG HOA",
        //   FlagDefault: val.FlagDefault ? "1" : "0",
        // });
        // if (response.isSuccess) {
        //   console.log(72, response);
        //   // queryClient.refetchQueries({ queryKey: ["Categories_GetAllActive"] });
        //   // handleCancel();
        // }
      });
    };

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 30 },
    };

    const handleChangeAccountNumber = (e: any) => {
      if (e.target.value) {
        setLoading(true);
        axios({
          url: "https://api.vietqr.io/v2/lookup",
          method: "post",
          headers: {
            "x-client-id": "demo-a34a5775-ae15-4a05-8422-1023eccbda3f",
            "x-api-key": "demo-2a02822e-ede3-4970-999b-18853d8e0ced",
            "Content-Type": "application/json",
          },
          data: JSON.stringify({
            bin: formRef.current?.getFieldValue("BankName"),
            accountNumber: e.target.value,
          }),
        })
          .then((response) => {
            setLoading(false);
            const nameAccount = response.data.data.accountName;
            formRef.current.setFieldValue("NameAccount", nameAccount);
            console.log(formRef);
          })
          .catch((error) => {
            formRef.current.setFieldValue("NameAccount", "");
            setLoading(false);
            formRef.current.setFields([
              {
                name: "AccountNumber",
                errors: ["Lỗi không xác định"],
              },
            ]);
            console.log(error);
          });
      }
    };

    return (
      <Modal
        width={700}
        open={isModalOpen}
        title="Thêm tài khoản ngân hàng"
        centered
        className="popup-custom"
        onCancel={handleCancel}
        footer={(_, {}) => (
          <>
            <Space size={15}>
              <Button onClick={onSave}>Ok</Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </Space>
          </>
        )}>
        {loading && <Spin size="large" spinning={loading} fullscreen />}
        <Form
          ref={formRef}
          initialValues={{
            BankCode: "",
            AccountNumber: "",
            NameAccount: "",
            FlagDefault: false,
          }}
          name="validate_other"
          {...formItemLayout}
          style={{ width: "100%" }}>
          <Form.Item
            name="BankCode"
            label="Tên ngân hàng"
            rules={[
              { required: true, message: "Tên ngân hàng không được để trống!" },
            ]}>
            <Select
              showSearch={true}
              filterOption={(input: string, option: any) =>
                option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              options={listBank?.map((item: any) => {
                return {
                  value: item.bin,
                  label: `${item.shortName} - ${item.name}`,
                };
              })}
              onChange={(value: any) => {
                formRef.current.setFieldValue("BankName", value);
                formRef.current.setFieldValue("AccountNumber", "");
                formRef.current.setFieldValue("NameAccount", "");
              }}
            />
          </Form.Item>
          <Form.Item
            name="AccountNumber"
            label="Số tài khoản"
            required
            rules={[
              { required: true, message: "Số tài khoản không được để trống!" },
              {
                validator: async (_, value) => {
                  const bankName = formRef.current?.getFieldValue("BankName");
                  if (!bankName) {
                    return Promise.reject(
                      new Error(
                        "Vui lòng chọn ngân hàng trước khi nhập số tài khoản"
                      )
                    );
                  }
                },
              },
            ]}>
            <Input placeholder="Nhập vào" onBlur={handleChangeAccountNumber} />
          </Form.Item>

          <Form.Item label="Tên tài khoản" name="NameAccount">
            <Input readOnly={true} />
          </Form.Item>
          <Form.Item
            label="Đặt làm mặc định"
            name="FlagDefault"
            valuePropName="checked">
            <Checkbox />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
);
