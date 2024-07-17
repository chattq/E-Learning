import React, { useRef, useState } from "react";

export default function Test() {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const videoRef = useRef<any>(null);
  const streamRef = useRef<any>(null);

  const startCamera = async () => {
    if (!isCameraOn) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraOn(true);
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    }
  };

  const stopCamera = () => {
    if (isCameraOn) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraOn(false);
    }
  };

  const toggleCamera = () => {
    if (isCameraOn) {
      stopCamera();
    } else {
      startCamera();
    }
  };
  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        style={{ width: "100%", maxWidth: "500px" }}
      />
      <button onClick={toggleCamera}>
        {isCameraOn ? "Turn off Camera" : "Turn on Camera"}
      </button>
    </div>
  );
}
