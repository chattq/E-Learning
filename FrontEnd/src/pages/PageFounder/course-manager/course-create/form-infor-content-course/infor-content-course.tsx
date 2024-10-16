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
  Upload,
} from "antd";
import { FaRegTrashCan } from "react-icons/fa6";
import ReactQuill from "react-quill";
import { nanoid } from "nanoid";
import { useConfigAPI } from "../../../../../packages/api/config-api";

export const InforContentCourse = forwardRef(({}, ref: any) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

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

  const [uploading, setUploading] = useState<boolean[]>([]); // Mảng cho trạng thái uploading
  const [uploadingAttachment, setUploadingAttachment] = useState<boolean[]>([]); // Mảng cho trạng thái uploading
  const api = useConfigAPI();

  const handleUpload = async (
    file: any,
    subFieldIndex: number, // Thay đổi tên tham số cho rõ ràng hơn
    fieldIndex: number // Thêm index của field để xác định task chính xác
  ) => {
    setUploading((prev) => {
      const newUploading = [...prev];
      newUploading[subFieldIndex] = true; // Bắt đầu upload cho task cụ thể
      return newUploading;
    });
    try {
      const respone = await api.File_Upload(file as File);

      if (respone.isSuccess) {
        const items = form
          .getFieldValue("items")
          .map((item: any, index: any) => {
            if (index === fieldIndex) {
              // Kiểm tra chỉ số để cập nhật đúng task
              const currentList = item[`list${fieldIndex + 1}`] || [];
              const updatedList = currentList.map(
                (task: any, taskIndex: any) => {
                  if (taskIndex === subFieldIndex) {
                    // Cập nhật task cụ thể
                    return {
                      ...task,
                      [`task${subFieldIndex + 1}`]: {
                        ...task[`task${subFieldIndex + 1}`], // Giữ lại các trường khác
                        LinkVideo: {
                          name: respone.data?.FileName,
                          url: respone.data?.FileUrl,
                        }, // Cập nhật uploadedFile
                      },
                    };
                  }
                  return task; // Giữ nguyên task khác
                }
              );
              return {
                ...item,
                [`list${fieldIndex + 1}`]: updatedList, // Cập nhật list với updatedList
              };
            }
            return item; // Giữ nguyên item khác
          });

        form.setFieldsValue({ items });
        message.success(`${respone.data?.FileName} uploaded successfully.`);
      } else {
        setUploading((prev) => {
          const newUploading = [...prev];
          newUploading[subFieldIndex] = false; // Kết thúc upload cho task cụ thể
          return newUploading;
        });
      }
    } catch (error) {
      message.error(`Failed to upload ${file.name}.`);
    } finally {
      setUploading((prev) => {
        const newUploading = [...prev];
        newUploading[subFieldIndex] = false; // Kết thúc upload cho task cụ thể
        return newUploading;
      });
    }

    return false; // Trả về false để không tự động upload lên
  };
  const handleUploadAttachment = async (
    file: any,
    subFieldIndex: number, // Thay đổi tên tham số cho rõ ràng hơn
    fieldIndex: number // Thêm index của field để xác định task chính xác
  ) => {
    setUploadingAttachment((prev) => {
      const newUploading = [...prev];
      newUploading[subFieldIndex] = true; // Bắt đầu upload cho task cụ thể
      return newUploading;
    });
    try {
      const respone = await api.File_Upload(file as File);

      if (respone.isSuccess) {
        const items = form
          .getFieldValue("items")
          .map((item: any, index: any) => {
            if (index === fieldIndex) {
              // Kiểm tra chỉ số để cập nhật đúng task
              const currentList = item[`list${fieldIndex + 1}`] || [];
              const updatedList = currentList.map(
                (task: any, taskIndex: any) => {
                  if (taskIndex === subFieldIndex) {
                    // Cập nhật task cụ thể
                    return {
                      ...task,
                      [`task${subFieldIndex + 1}`]: {
                        ...task[`task${subFieldIndex + 1}`], // Giữ lại các trường khác
                        Attachment: {
                          name: respone.data?.FileName,
                          url: respone.data?.FileUrl,
                        }, // Cập nhật uploadedFile
                      },
                    };
                  }
                  return task; // Giữ nguyên task khác
                }
              );
              return {
                ...item,
                [`list${fieldIndex + 1}`]: updatedList, // Cập nhật list với updatedList
              };
            }
            return item; // Giữ nguyên item khác
          });

        form.setFieldsValue({ items });
        message.success(`${respone.data?.FileName} uploaded successfully.`);
      } else {
        setUploadingAttachment((prev) => {
          const newUploading = [...prev];
          newUploading[subFieldIndex] = false; // Kết thúc upload cho task cụ thể
          return newUploading;
        });
      }
    } catch (error) {
      message.error(`Failed to upload ${file.name}.`);
    } finally {
      setUploadingAttachment((prev) => {
        const newUploading = [...prev];
        newUploading[subFieldIndex] = false; // Kết thúc upload cho task cụ thể
        return newUploading;
      });
    }

    return false; // Trả về false để không tự động upload lên
  };

  const handleAddTask = () => {
    const currentItems = form.getFieldValue("items") || [];
    const nextListIndex = currentItems.length + 1; // Xác định chỉ số của danh sách tiếp theo (list2, list3,...)

    const newItem = {
      [`ChapterTitle${nextListIndex}`]: "",
      [`list${nextListIndex}`]: [
        {
          task1: {
            LessonName: "",
            TypeLesson: "upload",
            PublicMode: false,
            LinkLesson: "",
            LinkVideo: {
              name: "",
              url: "",
            },
            Attachment: {
              name: "",
              url: "",
            },
            Remark: "",
          },
        },
      ],
    }; // Tạo task mới với key list tiếp theo
    form.setFieldsValue({
      items: [...currentItems, newItem], // Thêm task mới vào items
    });

    setUploading((prev) => [...prev, false]); // Thêm trạng thái uploading cho task mới
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
              ChapterTitle1: "",
              list1: [
                {
                  task1: {
                    LessonName: "",
                    TypeLesson: "upload",
                    PublicMode: false,
                    LinkLesson: "",
                    LinkVideo: {
                      name: "",
                      url: "",
                    },
                    Attachment: {
                      name: "",
                      url: "",
                    },
                    Remark: "",
                  },
                },
              ],
            },
          ],
        }} // Giá trị mặc định
      >
        <Form.List name="items">
          {(fields, { remove }) => (
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
                        name={[field.name, `ChapterTitle${field.name + 1}`]}
                        className="TitileCourse flex-1"
                        rules={[
                          {
                            required: true,
                            message: "Tiêu đề chương học không được để trống!",
                          },
                        ]}>
                        <Input
                          className="mr-2 "
                          placeholder={`Nhập tiêu đề chương  ${field.name + 1}`}
                          width={"100%"}
                        />
                      </Form.Item>
                    </>
                  }
                  key={field.key}
                  extra={
                    <CloseOutlined
                      onClick={() => {
                        remove(field.name);
                        setUploading((prev) =>
                          prev.filter((_, i) => i !== index)
                        ); // Xóa trạng thái uploading
                        let currentList = form.getFieldValue(["items"]);

                        currentList.splice(1, 1);

                        // Cập nhật lại thứ tự chương
                        currentList = currentList.map(
                          (item: any, index: any) => {
                            // Đổi tên key của chapter và list dựa trên index mới
                            const newChapterTitle = `ChapterTitle${index + 1}`;
                            const newListKey = `list${index + 1}`;

                            // Lấy các giá trị hiện có và đổi key của chúng
                            const {
                              [Object.keys(item)[0]]: chapterTitle,
                              [Object.keys(item)[1]]: list,
                            } = item;

                            return {
                              [newChapterTitle]: chapterTitle,
                              [newListKey]: list,
                            };
                          }
                        );

                        console.log(currentList);
                        form.setFieldsValue({
                          items: currentList,
                        });
                      }}
                    />
                  }>
                  <Form.Item>
                    <Form.List name={[field.name, `list${field.name + 1}`]}>
                      {(subFields, subOpt) => {
                        return (
                          <div key={nanoid()}>
                            <div className="">
                              {subFields.map((subField, subIndex) => {
                                return (
                                  <div className="flex items-center border-b-[1px] py-4 pl-2 gap-4">
                                    <div
                                      className="flex-1 pr-8 border-r-[1px] w-full"
                                      id={`task${subField.name + 1}`}>
                                      {/* Name Field */}
                                      <Form.Item
                                        labelCol={{ span: 3 }}
                                        wrapperCol={{ span: 18 }}
                                        label={`Tên bài học ${
                                          subField.name + 1
                                        }:`}
                                        name={[
                                          subField.name,
                                          `task${subField.name + 1}`,
                                          "LessonName",
                                        ]}
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
                                        name={[
                                          subField.name,
                                          `task${subField.name + 1}`,
                                          "TypeLesson",
                                        ]}
                                        label="Loại bài học">
                                        <Radio.Group
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
                                        ) => {
                                          const prevTypeLesson =
                                            prevValues.items?.[field.name]?.[
                                              `list${field.name + 1}`
                                            ]?.[subIndex]?.[
                                              `task${subField.name + 1}`
                                            ]?.TypeLesson;
                                          const currentTypeLesson =
                                            currentValues.items?.[field.name]?.[
                                              `list${field.name + 1}`
                                            ]?.[subIndex]?.[
                                              `task${subField.name + 1}`
                                            ]?.TypeLesson;

                                          return (
                                            prevTypeLesson !== currentTypeLesson
                                          );
                                        }}>
                                        {({
                                          getFieldValue,
                                          setFieldsValue,
                                        }) => {
                                          const selectedOption = getFieldValue([
                                            "items",
                                            field.name,
                                            `list${field.name + 1}`,
                                            subIndex,
                                            `task${subField.name + 1}`,
                                            "TypeLesson",
                                          ]);
                                          const LinkVideo = getFieldValue([
                                            "items",
                                            field.name,
                                            `list${field.name + 1}`,
                                            subIndex,
                                            `task${subField.name + 1}`,
                                            "LinkVideo",
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
                                                  `task${subField.name + 1}`,
                                                  "LinkVideo",
                                                ]}
                                                rules={[
                                                  {
                                                    required:
                                                      selectedOption ===
                                                      "upload",
                                                    message:
                                                      "Chưa upload video",
                                                  },
                                                ]}>
                                                <Upload
                                                  beforeUpload={(file) => {
                                                    handleUpload(
                                                      file,
                                                      subField.name,
                                                      field.name
                                                    ); // Cập nhật tham số
                                                  }}
                                                  showUploadList={true}>
                                                  <Button
                                                    disabled={
                                                      uploading[subIndex] ||
                                                      LinkVideo?.name
                                                        ? true
                                                        : false
                                                    }
                                                    loading={
                                                      uploading[subIndex]
                                                    }>
                                                    Upload File
                                                  </Button>
                                                </Upload>
                                                {LinkVideo?.name && (
                                                  <div className="flex border-[0.5px] justify-between max-w-[350px] items-center gap-2 px-4 py-2 rounded-lg mt-5">
                                                    {/* <div>{LinkLesson}</div> */}
                                                    <div
                                                      onClick={() => {
                                                        window.open(
                                                          LinkVideo.url,
                                                          "_blank"
                                                        );
                                                      }}
                                                      className="line-clamp-2 cursor-pointer hover:underline hover:text-[#37a731]">
                                                      {LinkVideo?.name}
                                                    </div>
                                                    <div>
                                                      <Tooltip
                                                        placement="top"
                                                        title={"Xóa file"}>
                                                        <FaRegTrashCan
                                                          size={20}
                                                          className="cursor-pointer"
                                                          onClick={() => {
                                                            setFieldsValue({
                                                              items: {
                                                                [field.name]: {
                                                                  [`list${
                                                                    field.name +
                                                                    1
                                                                  }`]: {
                                                                    [subIndex]:
                                                                      {
                                                                        [`task${
                                                                          subField.name +
                                                                          1
                                                                        }`]: {
                                                                          LinkVideo:
                                                                            {
                                                                              name: "",
                                                                              url: "",
                                                                            },
                                                                        },
                                                                      },
                                                                  },
                                                                },
                                                              },
                                                            });
                                                          }}
                                                        />
                                                      </Tooltip>
                                                    </div>
                                                  </div>
                                                )}
                                              </Form.Item>

                                              <Form.Item
                                                hidden={
                                                  selectedOption !== "link"
                                                }
                                                labelCol={{ span: 3 }}
                                                wrapperCol={{ span: 18 }}
                                                label="Link:"
                                                name={[
                                                  subField.name,
                                                  `task${subField.name + 1}`,
                                                  "LinkLesson",
                                                ]}
                                                rules={[
                                                  {
                                                    required:
                                                      selectedOption === "link",
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
                                        name={[
                                          subField.name,
                                          `task${subField.name + 1}`,
                                          "Attachment",
                                        ]}>
                                        <Upload
                                          beforeUpload={(file) => {
                                            handleUploadAttachment(
                                              file,
                                              subField.name,
                                              field.name
                                            ); // Cập nhật tham số
                                          }}
                                          showUploadList={true}>
                                          <Button
                                            disabled={
                                              uploadingAttachment[subIndex] ||
                                              form.getFieldValue([
                                                "items",
                                                field.name,
                                                `list${field.name + 1}`,
                                                subIndex,
                                                `task${subField.name + 1}`,
                                                "Attachment",
                                              ])?.name
                                                ? true
                                                : false
                                            }
                                            loading={
                                              uploadingAttachment[subIndex]
                                            }>
                                            Upload File
                                          </Button>
                                        </Upload>
                                        {form.getFieldValue([
                                          "items",
                                          field.name,
                                          `list${field.name + 1}`,
                                          subIndex,
                                          `task${subField.name + 1}`,
                                          "Attachment",
                                        ])?.name && (
                                          <div className="flex border-[0.5px] justify-between max-w-[350px] items-center gap-2 px-4 py-2 rounded-lg mt-5">
                                            {/* <div>{LinkLesson}</div> */}
                                            <div
                                              onClick={() => {
                                                window.open(
                                                  form.getFieldValue([
                                                    "items",
                                                    field.name,
                                                    `list${field.name + 1}`,
                                                    subIndex,
                                                    `task${subField.name + 1}`,
                                                    "Attachment",
                                                  ])?.url,
                                                  "_blank"
                                                );
                                              }}
                                              className="line-clamp-2 cursor-pointer hover:underline hover:text-[#37a731]">
                                              {
                                                form.getFieldValue([
                                                  "items",
                                                  field.name,
                                                  `list${field.name + 1}`,
                                                  subIndex,
                                                  `task${subField.name + 1}`,
                                                  "Attachment",
                                                ])?.name
                                              }
                                            </div>
                                            <div>
                                              <Tooltip
                                                placement="top"
                                                title={"Xóa file"}>
                                                <FaRegTrashCan
                                                  size={20}
                                                  className="cursor-pointer"
                                                  onClick={() => {
                                                    form.setFieldsValue({
                                                      items: {
                                                        [field.name]: {
                                                          [`list${
                                                            field.name + 1
                                                          }`]: {
                                                            [subIndex]: {
                                                              [`task${
                                                                subField.name +
                                                                1
                                                              }`]: {
                                                                Attachment: {
                                                                  name: "",
                                                                  url: "",
                                                                },
                                                              },
                                                            },
                                                          },
                                                        },
                                                      },
                                                    });
                                                  }}
                                                />
                                              </Tooltip>
                                            </div>
                                          </div>
                                        )}
                                      </Form.Item>
                                      <Form.Item
                                        labelCol={{ span: 3 }}
                                        wrapperCol={{ span: 18 }}
                                        label="Công khai:"
                                        valuePropName="checked"
                                        name={[
                                          subField.name,
                                          `task${subField.name + 1}`,
                                          "PublicMode",
                                        ]}>
                                        <Checkbox />
                                      </Form.Item>
                                      <Form.Item
                                        labelCol={{ span: 3 }}
                                        wrapperCol={{ span: 18 }}
                                        label="Note:"
                                        name={[
                                          subField.name,
                                          `task${subField.name + 1}`,
                                          "Remark",
                                        ]}>
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
                                            subOpt.remove(subField.name); // Xóa task hiện tại
                                            setUploading((prev) =>
                                              prev.filter((_, i) => i !== index)
                                            );
                                            const currentList =
                                              form.getFieldValue([
                                                "items",
                                                field.name,
                                                `list${field.name + 1}`,
                                              ]) || [];

                                            // Sau khi xóa, cập nhật lại key của các task còn lại
                                            const updatedList = currentList.map(
                                              (task: any, idx: any) => {
                                                const taskKey = `task${
                                                  idx + 1
                                                }`;
                                                const valueTask: any =
                                                  Object.values(task)[0];
                                                const updatedTask = {
                                                  [taskKey]: {
                                                    ...valueTask, // Giữ lại các giá trị của task
                                                  },
                                                };
                                                return updatedTask;
                                              }
                                            );

                                            // Cập nhật lại form với danh sách task đã cập nhật
                                            form.setFieldsValue({
                                              items: form
                                                .getFieldValue("items")
                                                .map((item: any, idx: any) =>
                                                  idx === field.name
                                                    ? {
                                                        ...item,
                                                        [`list${
                                                          field.name + 1
                                                        }`]: updatedList,
                                                      }
                                                    : item
                                                ),
                                            });

                                            success(); // Hiển thị thông báo thành công
                                          }}
                                        />
                                      </Tooltip>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="px-6 mt-5">
                              <Button
                                className=" "
                                type="dashed"
                                onClick={() => {
                                  // Lấy danh sách task hiện tại
                                  const currentList =
                                    form.getFieldValue([
                                      "items",
                                      field.name,
                                      `list${index + 1}`,
                                    ]) || [];

                                  // Tạo một task mới với key duy nhất
                                  const newTaskKey = `task${
                                    currentList.length + 1
                                  }`; // Sử dụng currentList.length để lấy số lượng task hiện tại

                                  // Cập nhật danh sách task mới
                                  const newList = [
                                    ...currentList, // Giữ nguyên các task hiện có
                                    {
                                      [newTaskKey]: {
                                        LessonName: "",
                                        TypeLesson: "upload",
                                        PublicMode: false,
                                        LinkLesson: "",
                                        LinkVideo: {
                                          name: "",
                                          url: "",
                                        },
                                        Attachment: {
                                          name: "",
                                          url: "",
                                        },
                                        Remark: "",
                                      },
                                    }, // Thêm task mới
                                  ];

                                  // Cập nhật giá trị form với task mới
                                  form.setFieldsValue({
                                    items: form
                                      .getFieldValue("items")
                                      .map((item: any, idx: any) =>
                                        idx === field.name
                                          ? {
                                              ...item,
                                              [`list${index + 1}`]: newList, // Cập nhật list với newList
                                            }
                                          : item
                                      ),
                                  });
                                }}
                                block>
                                + Thêm bài học
                              </Button>
                            </div>
                          </div>
                        );
                      }}
                    </Form.List>
                  </Form.Item>
                </Card>
              ))}

              <Button type="dashed" onClick={handleAddTask} block>
                + Thêm chương học
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
