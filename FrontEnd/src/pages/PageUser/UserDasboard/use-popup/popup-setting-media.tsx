import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Button, Modal, Switch } from "antd";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { streamAtom } from "../store";
import { nanoid } from "nanoid";
import { randowStoreAtom } from "../../../../packages/store/random-store";

// import { streamAtom } from "../store";

export const PopupSettingMedia = forwardRef(({}, ref) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const streamRef = useRef<any>();
  const [camera, setCamera] = useState(true);
  const [audio, setAudio] = useState(true);
  const setStream = useSetAtom(streamAtom);
  const setRandowStore = useSetAtom(randowStoreAtom);
  const [dataCourse, setDataCourse] = useState<any>({});

  const nav = useNavigate();
  const videoRef = useRef<any>();
  useImperativeHandle(ref, () => ({
    showPopup(item: any) {
      if (item.course_id) {
        setDataCourse(item);
        setOpen(true);
      }
    },
  }));

  const handleOk = () => {
    setLoading(true);
    nav(`admin/Course_online/room/${dataCourse.course_id}`);
    setRandowStore(nanoid());
  };

  const handleCancel = () => {
    setOpen(false);
    streamRef.current?.getTracks().forEach((track: any) => track.stop());
    streamRef.current
      ?.getAudioTracks()
      .forEach((track: any) => (track.enabled = false));
  };
  useEffect(() => {
    if (open) {
      // try {
      //   navigator.mediaDevices
      //     .getUserMedia({ video: true, audio: true })
      //     .then((stream) => {
      //       streamRef.current = stream;
      //       setStream(stream);
      //       if (videoRef.current) {
      //         videoRef.current.srcObject = stream;
      //       }
      //     });
      // } catch (error) {
      //   console.error(error);
      // }
    }
  }, [open]);

  return (
    <Modal
      open={open}
      title="Choose your audio and video settings for"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="submit" loading={loading} onClick={handleOk}>
          Submit
        </Button>,
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
      ]}>
      <div className="flex justify-center">
        <div className="">
          <video
            ref={videoRef}
            className="w-[450px] h-[300px] border-[0.5px] border-[#747474] rounded-t-md"
            autoPlay
            muted={true}></video>
          <div className="border-x-[0.5px] border-[#747474] border-b-[0.5px] flex items-center px-3 py-3 gap-4">
            <div className="flex items-center gap-3">
              <label>Camera</label>
              <Switch
                defaultValue={camera}
                onChange={(_value) =>
                  streamRef?.current
                    .getTracks()
                    .forEach((track: any) => track.stop())
                }
              />
            </div>
            <div className="flex items-center gap-3">
              <label>Micro</label>
              <Switch
                defaultValue={audio}
                onChange={(_value) =>
                  streamRef?.current
                    ?.getAudioTracks()
                    .forEach((track: any) => (track.enabled = false))
                }
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
});
