import React, { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  Space,
  Typography,
  Upload,
  message,
} from "antd";

const App: React.FC = () => {
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState<boolean[]>([]); // Mảng cho trạng thái uploading

  const handleUpload = async (file: any, fieldName: number) => {
    setUploading((prev) => {
      const newUploading = [...prev];
      newUploading[fieldName] = true; // Bắt đầu upload cho task cụ thể
      return newUploading;
    });

    const fakeUploadTime = 10000; // 2 giây

    try {
      await new Promise((resolve) => {
        setTimeout(() => {
          // Upload luôn thành công
          form.setFieldsValue({
            items: form.getFieldValue("items").map((item, index) => {
              if (index === fieldName) {
                return { ...item, uploadedFile: file.name }; // Cập nhật tên file đã upload
              }
              return item;
            }),
          });
          message.success(`${file.name} uploaded successfully.`);
          resolve(true);
        }, fakeUploadTime);
      });
    } catch (error) {
      // Xử lý lỗi nếu cần
    } finally {
      setUploading((prev) => {
        const newUploading = [...prev];
        newUploading[fieldName] = false; // Kết thúc upload cho task cụ thể
        return newUploading;
      });
    }

    return false; // Trả về false để không tự động upload lên
  };

  const handleAddTask = () => {
    const newItem = { uploadedFile: "" }; // Khởi tạo một task mới với trường uploadedFile
    form.setFieldsValue({ items: [...form.getFieldValue("items"), newItem] });
    setUploading((prev) => [...prev, false]); // Thêm trạng thái uploading cho task mới
  };

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      form={form}
      name="dynamic_form_complex"
      style={{ maxWidth: 600 }}
      autoComplete="off"
      initialValues={{ items: [{}] }} // Giá trị mặc định
    >
      <Form.List name="items">
        {(fields, { remove }) => (
          <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
            {fields.map((field, index) => (
              <Card
                size="small"
                title={`Item ${field.name + 1}`}
                key={field.key}
                extra={
                  <CloseOutlined
                    onClick={() => {
                      remove(field.name);
                      setUploading((prev) =>
                        prev.filter((_, i) => i !== index)
                      ); // Xóa trạng thái uploading
                    }}
                  />
                }>
                <Form.Item label="Name" name={[field.name, "name"]}>
                  <Input />
                </Form.Item>

                {/* Upload File */}
                <Form.Item label="Upload">
                  <Upload
                    beforeUpload={(file) => handleUpload(file, field.name)}
                    showUploadList={false}>
                    <Button loading={uploading[index]}>Upload File</Button>
                  </Upload>
                </Form.Item>

                {/* Hiển thị file đã upload */}
                <Form.Item label="Uploaded File">
                  <Input
                    disabled
                    value={
                      form.getFieldValue([
                        "items",
                        field.name,
                        "uploadedFile",
                      ]) || ""
                    }
                  />
                </Form.Item>

                {/* Nest Form.List */}
                <Form.Item label="List">
                  <Form.List name={[field.name, "list"]}>
                    {(subFields, subOpt) => (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          rowGap: 16,
                        }}>
                        {subFields.map((subField) => (
                          <Space key={subField.key}>
                            <Form.Item noStyle name={[subField.name, "first"]}>
                              <Input placeholder="first" />
                            </Form.Item>
                            <Form.Item noStyle name={[subField.name, "second"]}>
                              <Input placeholder="second" />
                            </Form.Item>
                            <CloseOutlined
                              onClick={() => {
                                subOpt.remove(subField.name);
                              }}
                            />
                          </Space>
                        ))}
                        <Button
                          type="dashed"
                          onClick={() => subOpt.add()}
                          block>
                          + Add Sub Item
                        </Button>
                      </div>
                    )}
                  </Form.List>
                </Form.Item>
              </Card>
            ))}

            <Button type="dashed" onClick={handleAddTask} block>
              + Add Task
            </Button>
          </div>
        )}
      </Form.List>

      <Form.Item noStyle shouldUpdate>
        {() => (
          <Typography>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
          </Typography>
        )}
      </Form.Item>
    </Form>
  );
};

export default App;
