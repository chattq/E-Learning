import React, { useEffect, useRef } from "react";

export default function VideoPlayer({ stream, className }: any) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current && stream) videoRef.current.srcObject = stream;
  }, [stream]);
  return (
    <video
      className={className}
      data-testid="peer-video"
      style={{ width: "100%", transform: "scaleX(-1)" }}
      ref={videoRef}
      autoPlay
      muted={true}
    />
  );
}
