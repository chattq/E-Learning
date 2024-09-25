import { forwardRef, ReactNode, useImperativeHandle, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Modal, Spin, Upload } from "antd";
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
  FileList?: UploadedFile[];
  getDataFile?: ((data?: UploadedFile) => void) | undefined;
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
    }: UploadFileCustomProps,
    ref: any
  ) => {
    const api = useConfigAPI();
    const [loading, setLoading] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewTitle, setPreviewTitle] = useState("");
    const [previewType, setPreviewType] = useState("");
    const [previewUrl, setPreviewUrl] = useState("");
    const [dataFile, setDataFile] = useState<UploadedFile | any>({});

    const handleCancel = () => setPreviewOpen(false);
    useImperativeHandle(ref, () => ({
      getValue: () => {
        return dataFile;
      },
    }));

    const handlePreview = async (file: any) => {
      console.log(76, file);
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

    const handleChange: UploadProps["onChange"] = async ({
      fileList: newFileList,
    }) => {
      setLoading(true);
      const respone = await api.File_Upload(
        newFileList[0].originFileObj as File
      );
      if (respone.isSuccess) {
        const newFile = {
          uid: nanoid(), // UID của file mới upload
          name: respone.data?.FileName, // Tên file mới
          status: "done", // Trạng thái file
          url: respone.data?.FileUrl, // URL trả về từ API sau khi upload
        };

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

    console.log(75, fileList);

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
          // customRequest={async ({ file, onSuccess, onError }: any) => {
          //   setLoading(true);
          //   const respone = await api.File_Upload(file as File);

          //   if (respone.isSuccess) {
          //     const newFile = {
          //       uid: nanoid(), // UID của file mới upload
          //       name: respone.data?.FileName, // Tên file mới
          //       status: "done", // Trạng thái file
          //       url: respone.data?.FileUrl, // URL trả về từ API sau khi upload
          //     };

          //     setFileList((prevList: any) => [...prevList, newFile]);
          //     setLoading(false);
          //     getDataFile?.(respone.data);
          //     setDataFile(respone.data);
          //     onSuccess(respone.data?.FileUrl);
          //   } else {
          //     setLoading(false);
          //   }
          // }}
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
