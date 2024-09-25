import "./infor-content-course.scss";
import { forwardRef, Fragment, useCallback, useState } from "react";
import {
  CloseOutlined,
  MinusCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  message,
  Radio,
  Tooltip,
  Typography,
} from "antd";

import { FaRegTrashCan } from "react-icons/fa6";
import { UploadFileCustom } from "../../../../../packages/ui/UploadFile/UploadFile";
import ReactQuill from "react-quill";
import { nanoid } from "nanoid";

export const InforContentCourse = forwardRef(({}, ref: any) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [uploadStates, setUploadStates] = useState({});

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Xóa bài học thành công!",
    });
  };
  const modules = {
    toolbar: [
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" },
      ], // Căn trái, giữa, phải, đều
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"], // Xóa định dạng
    ],
    clipboard: {
      matchVisual: false, // Giữ nguyên định dạng của nội dung được dán
    },
  };

  return (
    <div className="mt-5">
      <Form
        ref={ref}
        layout="horizontal"
        // wrapperCol={{ span: 18 }}
        colon={true}
        form={form}
        labelWrap
        labelAlign="right"
        name="dynamic_form_complex"
        autoComplete="off"
        initialValues={{
          items: [
            {
              list: [
                {
                  LessonName: "",
                  TypeLesson: "upload",
                  PublicMode: false,
                  LinkLesson: "",
                  LinkVideo: "",
                  File: "",
                  Remark: "",
                },
              ],
            },
          ],
        }}>
        <Form.List name="items">
          {(fields, { add, remove }) => (
            <div
              style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
              {fields.map((field, index) => (
                <Card
                  size="small"
                  className="Card_Course"
                  title={
                    <>
                      <Form.Item
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        name={[field.name, "ChapterTitle"]}
                        className="TitileCourse flex-1"
                        rules={[
                          {
                            required: true,
                            message: "Tiêu đề chương học không được để trống!",
                          },
                        ]}>
                        <Input
                          className="mr-2 "
                          placeholder={`Nhập tiêu đề chương  ${index + 1}`}
                          width={"100%"}
                        />
                      </Form.Item>
                    </>
                  }
                  key={nanoid()}
                  extra={
                    <CloseOutlined
                      className="ml-2"
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  }>
                  {/* Nest Form.List */}
                  <Form.Item>
                    <Form.List name={[field.name, "list"]}>
                      {(subFields, subOpt) => (
                        <div key={nanoid()}>
                          <div className="">
                            {subFields.map((subField, index) => (
                              <>
                                <div className="flex items-center border-b-[1px] py-4 pl-2 gap-4">
                                  <div className="flex-1 pr-8 border-r-[1px] w-full">
                                    <Form.Item
                                      labelCol={{ span: 3 }}
                                      wrapperCol={{ span: 18 }}
                                      label={`Tên bài học ${index + 1}:`}
                                      name={[subField.name, "LessonName"]}
                                      rules={[
                                        {
                                          required: true,
                                          message:
                                            "Tiêu đề chương học không được để trống!",
                                        },
                                      ]}>
                                      <Input />
                                    </Form.Item>
                                    <Form.Item
                                      labelCol={{ span: 3 }}
                                      wrapperCol={{ span: 18 }}
                                      label="Loại bài học"
                                      name={[subField.name, "TypeLesson"]}>
                                      <Radio.Group
                                        // onChange={handleRadioChange}
                                        name="radiogroup"
                                        defaultValue={"upload"}>
                                        <Radio value={"upload"}>Video</Radio>
                                        <Radio value={"link"}>Link</Radio>
                                      </Radio.Group>
                                    </Form.Item>
                                    <Form.Item
                                      noStyle
                                      //thuộc tính shouldUpdate trong Form.Item được sử dụng để quyết định khi nào cần render
                                      //lại Form.Item dựa trên sự thay đổi của các giá trị form.
                                      shouldUpdate={(
                                        prevValues,
                                        currentValues
                                      ) =>
                                        prevValues.items?.[field.name]?.list?.[
                                          subField.name
                                        ]?.TypeLesson !==
                                        currentValues.items?.[field.name]
                                          ?.list?.[subField.name]?.TypeLesson
                                      }>
                                      {({ getFieldValue, setFieldsValue }) => {
                                        const selectedOption = getFieldValue([
                                          "items",
                                          field.name,
                                          "list",
                                          subField.name,
                                          "TypeLesson",
                                        ]);

                                        return (
                                          <>
                                            <Form.Item
                                              hidden={
                                                selectedOption !== "upload"
                                              }
                                              labelCol={{ span: 3 }}
                                              wrapperCol={{ span: 18 }}
                                              label="Upload video:"
                                              name={[
                                                subField.name,
                                                "LinkVideo",
                                              ]}
                                              rules={[
                                                {
                                                  required: true,
                                                  message: "Chưa upload video",
                                                },
                                              ]}>
                                              <UploadFileCustom
                                                multiple={false}
                                                maxFileUpload={1}
                                                getDataFile={(data) => {
                                                  if (data) {
                                                    setFieldsValue({
                                                      ["items"]: {
                                                        ...getFieldValue(
                                                          "items"
                                                        ),
                                                        [field.name]: {
                                                          ...getFieldValue([
                                                            "items",
                                                            field.name,
                                                          ]),
                                                          list: {
                                                            ...getFieldValue([
                                                              "items",
                                                              field.name,
                                                              "list",
                                                            ]),
                                                            [subField.name]: {
                                                              ...getFieldValue([
                                                                "items",
                                                                field.name,
                                                                "list",
                                                                subField.name,
                                                              ]),
                                                              LinkVideo:
                                                                data?.FileUrl, // Cập nhật giá trị vào form
                                                            },
                                                          },
                                                        },
                                                      },
                                                    });
                                                  }
                                                }}
                                              />
                                            </Form.Item>

                                            <Form.Item
                                              hidden={selectedOption !== "link"}
                                              labelCol={{ span: 3 }}
                                              wrapperCol={{ span: 18 }}
                                              label="Link:"
                                              name={[
                                                subField.name,
                                                "LinkLesson",
                                              ]}
                                              rules={[
                                                {
                                                  required: true,
                                                  message:
                                                    "Link khóa học không được để trống",
                                                },
                                              ]}>
                                              <Input />
                                            </Form.Item>
                                          </>
                                        );
                                      }}
                                    </Form.Item>
                                    <Form.Item
                                      labelCol={{ span: 3 }}
                                      wrapperCol={{ span: 18 }}
                                      label="Tệp đính kèm:"
                                      name={[subField.name, "Attachment"]}>
                                      <UploadFileCustom
                                        multiple={false}
                                        maxFileUpload={1}
                                        customButtonUpload={
                                          <Button icon={<UploadOutlined />}>
                                            Click to Upload
                                          </Button>
                                        }
                                        listType="picture"
                                      />
                                    </Form.Item>
                                    <Form.Item
                                      labelCol={{ span: 3 }}
                                      wrapperCol={{ span: 18 }}
                                      label="Công khai:"
                                      name={[subField.name, "PublicMode"]}>
                                      <Checkbox />
                                    </Form.Item>
                                    <Form.Item
                                      labelCol={{ span: 3 }}
                                      wrapperCol={{ span: 18 }}
                                      label="Note:"
                                      name={[subField.name, "Remark"]}>
                                      <ReactQuill
                                        modules={modules}
                                        theme="snow"
                                      />
                                    </Form.Item>
                                  </div>
                                  <div className="w-[50px] ml-3 flex items-center ">
                                    <Tooltip
                                      placement="top"
                                      title={"Xóa bài học"}>
                                      <FaRegTrashCan
                                        className="cursor-pointer"
                                        size={20}
                                        onClick={() => {
                                          subOpt.remove(subField.name);
                                          success();
                                        }}
                                      />
                                    </Tooltip>
                                  </div>
                                </div>
                              </>
                            ))}
                          </div>
                          <div className="px-6 mt-4">
                            <Button
                              className=" "
                              type="dashed"
                              onClick={() =>
                                subOpt.add({
                                  LessonName: "",
                                  TypeLesson: "upload",
                                  PublicMode: false,
                                  LinkLesson: "",
                                  LinkVideo: "",
                                  File: "",
                                  Remark: "",
                                })
                              }
                              block>
                              Thêm bài học
                            </Button>
                          </div>
                        </div>
                      )}
                    </Form.List>
                  </Form.Item>
                </Card>
              ))}

              <Button type="dashed" onClick={() => add()} block>
                Thêm nội dung
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
      {contextHolder}
    </div>
  );
});
