import { forwardRef, ReactNode, useImperativeHandle, useState } from "react";
import {
  DeleteOutlined,
  EyeOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { message, Modal, Spin, Upload } from "antd";
import type { UploadFile, UploadProps } from "antd";
import "./UploadFile.scss";
import { useConfigAPI } from "../../api/config-api";
import { UploadListType } from "antd/es/upload/interface";
import { UploadedFile } from "../../types/api.types";
import { nanoid } from "nanoid";

type UploadFileCustomProps = {
  multiple?: boolean;
  maxFileUpload?: number;
  listType?: UploadListType;
  customButtonUpload?: ReactNode;
  accept?: string;
  FileList?: UploadedFile[];
  getDataFile: (data: { url: string | any }) => void;
};
export const UploadFileCustom = forwardRef(
  (
    {
      multiple = false,
      maxFileUpload = 1,
      listType = "picture-card",
      customButtonUpload,
      FileList = [],
      getDataFile,
      accept,
    }: UploadFileCustomProps,
    ref: any
  ) => {
    const api = useConfigAPI();
    const [loading, setLoading] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewType, setPreviewType] = useState("");
    const [previewUrl, setPreviewUrl] = useState("");
    const [messageApi, contextHolder] = message.useMessage();

    const handleCancel = () => setPreviewOpen(false);
    useImperativeHandle(ref, () => ({
      getValue: () => {
        return fileList;
      },
    }));

    const handlePreview = async (file: any) => {
      setPreviewOpen(true);
      const type = file.name.includes(".mp4");
      setPreviewUrl(file.url);
      if (type) {
        setPreviewType("video");
      }
    };

    const handleUpload = async (file: any) => {
      setLoading(true);
      const respone = await api.File_Upload(file);
      if (respone.isSuccess) {
        const newFile = {
          uid: nanoid(), // UID của file mới upload
          name: respone.data?.FileName, // Tên file mới
          status: "done", // Trạng thái file
          url: respone.data?.FileUrl, // URL trả về từ API sau khi upload
        };
        message.success(`${respone.data?.FileName} uploaded successfully.`);
        getDataFile({ url: respone.data?.FileUrl });
        setFileList((prevList: any) => [...prevList, newFile]);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    const uploadButton = (
      <button style={{ border: 0, background: "none" }} type="button">
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </button>
    );
    const handleRemove = (file: UploadFile) => {
      setFileList((prevList) =>
        prevList.filter((item) => item.uid !== file.uid)
      );
    };

    return (
      <>
        <Upload
          action={`${import.meta.env.VITE_API_DOMAIN}/medias/upload-images`}
          listType={listType}
          accept={accept}
          fileList={fileList}
          headers={{
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "multipart/form-data",
          }}
          multiple={multiple}
          onPreview={handlePreview}
          beforeUpload={(file) => {
            handleUpload(file); // Cập nhật tham số
          }}
          onRemove={handleRemove}
          showUploadList={{
            showRemoveIcon: true, // Hiện icon xóa
            showPreviewIcon: true, // Hiện icon xem trước
            previewIcon: <EyeOutlined />, // Icon xem trước
            removeIcon: <DeleteOutlined />, // Icon xóa
          }}>
          {loading ? (
            <Spin indicator={<LoadingOutlined spin />} />
          ) : fileList.length >= maxFileUpload ? null : customButtonUpload ? (
            customButtonUpload
          ) : (
            uploadButton
          )}
        </Upload>

        <Modal
          open={previewOpen}
          title={"Xem ảnh"}
          footer={null}
          onCancel={handleCancel}>
          {previewType === "video" ? (
            <video width="100%" controls>
              <source src={previewUrl} type="video/mp4" />
              Your browser does not support HTML video.
            </video>
          ) : (
            <img alt="preview" style={{ width: "100%" }} src={previewUrl} />
          )}
        </Modal>
        {contextHolder}
      </>
    );
  }
);
