import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space, Typography } from "antd";
import { useWindowSize } from "../../../../../packages/hooks/useWindowSize";
import TextArea from "antd/es/input/TextArea";
import "./infor-detail-course.scss";
import { forwardRef } from "react";

export const InforDetailCourse = forwardRef(({}, ref: any) => {
  const [form] = Form.useForm();
  const windowSize = useWindowSize();
  return (
    <div className="mt-3 border-b-[0.5px] pb-5">
      <div className="flex justify-center font-semibold mb-1 underline">
        Kiến thức mà học viên sẽ đạt được
      </div>
      <Form
        ref={ref}
        form={form}
        name="dynamic_form_complex"
        autoComplete="off"
        initialValues={{ Knowledge: [{}] }}>
        <Form.List name="Knowledge">
          {(fields, { add, remove }) => (
            <>
              <div>
                <Space size={20} wrap>
                  {fields.map((field) => (
                    <Card
                      className="card-wapper"
                      style={{
                        width: (windowSize.width - 390) / 3,
                      }}
                      title={`Nội dung ${field.name + 1}`}
                      key={field.key}
                      extra={
                        <CloseOutlined
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      }>
                      <Form.Item
                        name={[field.name, "name"]}
                        rules={[
                          { required: true, message: "Không được để trống ô" },
                        ]}>
                        <TextArea
                          style={{
                            width: "100%",
                            height: 80,
                          }}
                        />
                      </Form.Item>
                    </Card>
                  ))}
                  <div
                    style={{
                      width: 100,
                    }}>
                    <Button type="dashed" onClick={() => add()} block>
                      Thêm
                    </Button>
                  </div>
                </Space>
              </div>
            </>
          )}
        </Form.List>
      </Form>
    </div>
  );
});
