import { useEffect, useRef } from "react";

export default function VideoPlayer({
  stream,
  className,
  isScaleX = true,
}: any) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current && stream) videoRef.current.srcObject = stream;
  }, [stream]);
  return (
    <video
      className={className}
      data-testid="peer-video"
      style={{
        width: "100%",
        transform: isScaleX ? "scaleX(-1)" : "scaleX(1)",
      }}
      ref={videoRef}
      autoPlay
      muted={true}
    />
  );
}
