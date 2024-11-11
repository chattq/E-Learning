import { Cascader, Form, Input, InputNumber, Modal, Select } from "antd";
import React, { useState } from "react";

interface ModalEditInfoProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const ModalEditInfo = (isModalOpen: any) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    isModalOpen?.setIsModalOpen(false);
  };

  const handleCancel = () => {
    isModalOpen?.setIsModalOpen(false);
  };

  return (
    <Modal
      title="Sửa thông tin cá nhân"
      open={isModalOpen?.isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}>
      <Form
        form={form}
        name="register"
        initialValues={{
          residence: ["zhejiang", "hangzhou", "xihu"],
          prefix: "86",
        }}
        style={{ maxWidth: 600 }}
        scrollToFirstError>
        <Form.Item
          name="name"
          label="Họ tên"
          rules={[
            {
              required: true,
              message: "Please input your nickname!",
              whitespace: true,
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="work"
          label="Làm việc tại"
          // rules={[
          //   {
          //     required: true,
          //     message: "Please input your nickname!",
          //     whitespace: true,
          //   },
          // ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="school"
          label="Học tại"
          // rules={[
          //   {
          //     required: true,
          //     message: "Please input your nickname!",
          //     whitespace: true,
          //   },
          // ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address"
          label="Sống tại"
          // rules={[
          //   {
          //     required: true,
          //     message: "Please input your nickname!",
          //     whitespace: true,
          //   },
          // ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="SĐT"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}>
          <Input style={{ width: "100%" }} />
        </Form.Item>

        {/* <Form.Item
          name="gender"
          label="Giới tính"
          rules={[{ required: true, message: "Please select gender!" }]}>
          <Select placeholder="select your gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

export default ModalEditInfo;
