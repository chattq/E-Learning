import { forwardRef, ReactNode, useState } from "react";
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Modal, Spin, Upload } from "antd";
import type { UploadFile, UploadProps } from "antd";
import "./UploadFile.scss";
import { useConfigAPI } from "../../api/config-api";
import { UploadListType } from "antd/es/upload/interface";

type UploadFileCustomProps = {
  multiple?: boolean;
  maxFileUpload?: number;
  listType?: UploadListType;
  customButtonUpload?: ReactNode;
};
export const UploadFileCustom = forwardRef(
  (
    {
      multiple = false,
      maxFileUpload = 1,
      listType = "picture-card",
      customButtonUpload,
    }: UploadFileCustomProps,
    ref: any
  ) => {
    const api = useConfigAPI();
    const [loading, setLoading] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[] | any>([]);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewTitle, setPreviewTitle] = useState("");
    const [previewType, setPreviewType] = useState("");
    const [previewUrl, setPreviewUrl] = useState("");

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
      if (!file.url && !file.preview) {
        file.preview = URL.createObjectURL(file.originFileObj);
      }

      setPreviewType(file.type.startsWith("video") ? "video" : "image");
      setPreviewUrl(file.url || file.preview);
      setPreviewTitle(
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
      );
      setPreviewVisible(true);
    };

    const handleChange: UploadProps["onChange"] = ({
      fileList: newFileList,
    }) => {
      setFileList(newFileList);
    };

    const uploadButton = (
      <button style={{ border: 0, background: "none" }} type="button">
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </button>
    );

    return (
      <>
        <Upload
          action={`${import.meta.env.VITE_API_DOMAIN}/medias/upload-images`}
          listType={listType}
          fileList={fileList}
          headers={{
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "multipart/form-data",
          }}
          customRequest={async ({ file, onSuccess, onError }: any) => {
            setLoading(true);
            // Xử lý việc upload file bằng axios
            const respone = await api.File_Upload(file as File);
            console.log(80, respone);
            if (respone.isSuccess) {
              setLoading(false);
              onSuccess(respone.data);
            } else {
              setLoading(false);
            }
          }}
          multiple={multiple}
          onPreview={handlePreview}
          showUploadList={!loading}
          // itemRender={() => {
          //   return <div>a</div>;
          // }}
          onChange={handleChange}>
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
          title={previewTitle}
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
      </>
    );
  }
);
