import React from "react";
// import { CloseOutlined } from "@ant-design/icons";
// import {
//   Button,
//   Card,
//   Form,
//   Input,
//   Radio,
//   Typography,
//   Upload,
//   message,
// } from "antd";

const App: React.FC = () => {
  // const [form] = Form.useForm();
  // const [uploading, setUploading] = useState<boolean[]>([]); // Mảng cho trạng thái uploading

  // const handleUpload = async (
  //   file: any,
  //   subFieldIndex: number, // Thay đổi tên tham số cho rõ ràng hơn
  //   fieldIndex: number // Thêm index của field để xác định task chính xác
  // ) => {
  //   setUploading((prev) => {
  //     const newUploading = [...prev];
  //     newUploading[subFieldIndex] = true; // Bắt đầu upload cho task cụ thể
  //     return newUploading;
  //   });

  //   const fakeUploadTime = 10000; // Giả lập thời gian upload

  //   try {
  //     await new Promise((resolve) => {
  //       setTimeout(() => {
  //         // Cập nhật vào mảng `listX` theo đúng cấu trúc
  //         const items = form
  //           .getFieldValue("items")
  //           .map((item: any, index: any) => {
  //             if (index === fieldIndex) {
  //               // Kiểm tra chỉ số để cập nhật đúng task
  //               const currentList = item[`list${fieldIndex + 1}`] || [];
  //               const updatedList = currentList.map(
  //                 (task: any, taskIndex: any) => {
  //                   if (taskIndex === subFieldIndex) {
  //                     // Cập nhật task cụ thể
  //                     return {
  //                       ...task,
  //                       [`task${subFieldIndex + 1}`]: {
  //                         ...task[`task${subFieldIndex + 1}`], // Giữ lại các trường khác
  //                         uploadedFile: file.name, // Cập nhật uploadedFile
  //                       },
  //                     };
  //                   }
  //                   return task; // Giữ nguyên task khác
  //                 }
  //               );
  //               return {
  //                 ...item,
  //                 [`list${fieldIndex + 1}`]: updatedList, // Cập nhật list với updatedList
  //               };
  //             }
  //             return item; // Giữ nguyên item khác
  //           });

  //         form.setFieldsValue({ items });
  //         message.success(`${file.name} uploaded successfully.`);
  //         resolve(true);
  //       }, fakeUploadTime);
  //     });
  //   } catch (error) {
  //     message.error(`Failed to upload ${file.name}.`);
  //   } finally {
  //     setUploading((prev) => {
  //       const newUploading = [...prev];
  //       newUploading[subFieldIndex] = false; // Kết thúc upload cho task cụ thể
  //       return newUploading;
  //     });
  //   }

  //   return false; // Trả về false để không tự động upload lên
  // };

  // const handleAddTask = () => {
  //   const currentItems = form.getFieldValue("items") || [];
  //   const nextListIndex = currentItems.length + 1; // Xác định chỉ số của danh sách tiếp theo (list2, list3,...)

  //   const newItem = {
  //     [`list${nextListIndex}`]: [
  //       {
  //         task1: {
  //           name: "",
  //           uploadedFile: "",
  //         },
  //       },
  //     ],
  //   }; // Tạo task mới với key list tiếp theo
  //   form.setFieldsValue({
  //     items: [...currentItems, newItem], // Thêm task mới vào items
  //   });

  //   setUploading((prev) => [...prev, false]); // Thêm trạng thái uploading cho task mới
  // };

  return (
    <></>
    // <Form
    //   labelCol={{ span: 6 }}
    //   wrapperCol={{ span: 18 }}
    //   form={form}
    //   name="dynamic_form_complex"
    //   style={{ maxWidth: 600 }}
    //   autoComplete="off"
    //   initialValues={{
    //     items: [
    //       {
    //         list1: [
    //           {
    //             task1: {
    //               name: "",
    //               uploadedFile: "",
    //             },
    //           },
    //         ],
    //       },
    //     ],
    //   }} // Giá trị mặc định
    // >
    //   <Form.List name="items">
    //     {(fields, { remove }) => (
    //       <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
    //         {fields.map((field, index) => (
    //           <Card
    //             size="small"
    //             title={`Item ${field.name + 1}`}
    //             key={field.key}
    //             extra={
    //               <CloseOutlined
    //                 onClick={() => {
    //                   remove(field.name);
    //                   setUploading((prev) =>
    //                     prev.filter((_, i) => i !== index)
    //                   ); // Xóa trạng thái uploading
    //                 }}
    //               />
    //             }>
    //             <Form.Item>
    //               <Form.List name={[field.name, `list${index + 1}`]}>
    //                 {(subFields, subOpt) => {
    //                   return (
    //                     <div
    //                       style={{
    //                         display: "flex",
    //                         flexDirection: "column",
    //                         rowGap: 16,
    //                       }}>
    //                       {subFields.map((subField, subIndex) => {
    //                         return (
    //                           <Card
    //                             size="small"
    //                             title={`Sub Item ${subField.name + 1}`}
    //                             key={subField.key}
    //                             extra={
    //                               <CloseOutlined
    //                                 onClick={() => subOpt.remove(subField.name)}
    //                               />
    //                             }>
    //                             {/* Name Field */}
    //                             <Form.Item
    //                               labelCol={{ span: 3 }}
    //                               wrapperCol={{ span: 18 }}
    //                               label="Loại bài học">
    //                               <Radio.Group
    //                                 onChange={(e) => {
    //                                   const nameValue = e.target.value; // Giá trị name mới
    //                                   const items = form
    //                                     .getFieldValue("items")
    //                                     .map((item, index) => {
    //                                       if (index === field.name) {
    //                                         // Kiểm tra chỉ số để cập nhật đúng task
    //                                         const currentList =
    //                                           item[`list${field.name + 1}`] ||
    //                                           [];
    //                                         const updatedList = currentList.map(
    //                                           (task, taskIndex) => {
    //                                             if (
    //                                               taskIndex === subField.name
    //                                             ) {
    //                                               // Cập nhật task cụ thể

    //                                               return {
    //                                                 ...task,
    //                                                 [`task${
    //                                                   subField.name + 1
    //                                                 }`]: {
    //                                                   // Cập nhật trường task
    //                                                   ...task[
    //                                                     `task${
    //                                                       subField.name + 1
    //                                                     }`
    //                                                   ], // Giữ lại các trường khác

    //                                                   TypeLesson: nameValue, // Cập nhật name vào task
    //                                                 },
    //                                               };
    //                                             }
    //                                             return task; // Giữ nguyên task khác
    //                                           }
    //                                         );
    //                                         return {
    //                                           ...item,
    //                                           [`list${field.name + 1}`]:
    //                                             updatedList, // Cập nhật list với updatedList
    //                                         };
    //                                       }
    //                                       return item; // Giữ nguyên item khác
    //                                     });

    //                                   form.setFieldsValue({ items });
    //                                 }}
    //                                 name="radiogroup"
    //                                 defaultValue={"upload"}>
    //                                 <Radio value={"upload"}>Video</Radio>
    //                                 <Radio value={"link"}>Link</Radio>
    //                               </Radio.Group>
    //                             </Form.Item>
    //                             <Form.Item
    //                               label="Name"
    //                               hidden={
    //                                 form.getFieldValue([
    //                                   "items",
    //                                   field.name,
    //                                   `list${field.name + 1}`,
    //                                   subField.name,
    //                                 ])[`task${subField.name + 1}`]
    //                                   ?.TypeLesson === "link"
    //                               }>
    //                               <Input
    //                                 onChange={(e) => {
    //                                   const nameValue = e.target.value; // Giá trị name mới
    //                                   const items = form
    //                                     .getFieldValue("items")
    //                                     .map((item, index) => {
    //                                       if (index === field.name) {
    //                                         // Kiểm tra chỉ số để cập nhật đúng task
    //                                         const currentList =
    //                                           item[`list${field.name + 1}`] ||
    //                                           [];
    //                                         const updatedList = currentList.map(
    //                                           (task, taskIndex) => {
    //                                             if (
    //                                               taskIndex === subField.name
    //                                             ) {
    //                                               // Cập nhật task cụ thể

    //                                               return {
    //                                                 ...task,
    //                                                 [`task${
    //                                                   subField.name + 1
    //                                                 }`]: {
    //                                                   // Cập nhật trường task
    //                                                   ...task[
    //                                                     `task${
    //                                                       subField.name + 1
    //                                                     }`
    //                                                   ], // Giữ lại các trường khác

    //                                                   name: nameValue, // Cập nhật name vào task
    //                                                 },
    //                                               };
    //                                             }
    //                                             return task; // Giữ nguyên task khác
    //                                           }
    //                                         );
    //                                         return {
    //                                           ...item,
    //                                           [`list${field.name + 1}`]:
    //                                             updatedList, // Cập nhật list với updatedList
    //                                         };
    //                                       }
    //                                       return item; // Giữ nguyên item khác
    //                                     });

    //                                   form.setFieldsValue({ items });
    //                                 }}
    //                               />
    //                             </Form.Item>

    //                             {/* Upload File */}
    //                             <Form.Item label="Upload">
    //                               <Upload
    //                                 beforeUpload={
    //                                   (file) =>
    //                                     handleUpload(
    //                                       file,
    //                                       subField.name,
    //                                       field.name
    //                                     ) // Cập nhật tham số
    //                                 }
    //                                 showUploadList={false}>
    //                                 <Button loading={uploading[subIndex]}>
    //                                   Upload File
    //                                 </Button>
    //                               </Upload>
    //                             </Form.Item>

    //                             <Form.Item label="Uploaded File">
    //                               <Input
    //                                 disabled
    //                                 value={
    //                                   form.getFieldValue([
    //                                     "items",
    //                                     field.name,
    //                                     `list${field.name + 1}`,
    //                                     subField.name,
    //                                   ])[`task${subField.name + 1}`]
    //                                     ?.uploadedFile || ""
    //                                 }
    //                               />
    //                             </Form.Item>
    //                           </Card>
    //                         );
    //                       })}

    //                       <Button
    //                         type="dashed"
    //                         onClick={() => {
    //                           // Lấy danh sách task hiện tại
    //                           const currentList =
    //                             form.getFieldValue([
    //                               "items",
    //                               field.name,
    //                               `list${index + 1}`,
    //                             ]) || [];

    //                           // Tạo một task mới với key duy nhất
    //                           const newTaskKey = `task${
    //                             currentList.length + 1
    //                           }`; // Sử dụng currentList.length để lấy số lượng task hiện tại

    //                           // Cập nhật danh sách task mới
    //                           const newList = [
    //                             ...currentList, // Giữ nguyên các task hiện có
    //                             {
    //                               [newTaskKey]: { uploadedFile: "", name: "" },
    //                             }, // Thêm task mới
    //                           ];

    //                           // Cập nhật giá trị form với task mới
    //                           form.setFieldsValue({
    //                             items: form
    //                               .getFieldValue("items")
    //                               .map((item: any, idx: any) =>
    //                                 idx === field.name
    //                                   ? {
    //                                       ...item,
    //                                       [`list${index + 1}`]: newList, // Cập nhật list với newList
    //                                     }
    //                                   : item
    //                               ),
    //                           });
    //                         }}
    //                         block>
    //                         + Add Sub Item
    //                       </Button>
    //                     </div>
    //                   );
    //                 }}
    //               </Form.List>
    //             </Form.Item>
    //           </Card>
    //         ))}

    //         <Button type="dashed" onClick={handleAddTask} block>
    //           + Add Task
    //         </Button>
    //       </div>
    //     )}
    //   </Form.List>

    //   <Form.Item noStyle shouldUpdate>
    //     {() => (
    //       <Typography>
    //         <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
    //       </Typography>
    //     )}
    //   </Form.Item>
    // </Form>
  );
};

export default App;
