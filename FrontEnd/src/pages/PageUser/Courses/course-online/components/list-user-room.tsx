import React from "react";
import { deleteKeyFromObject } from "../CourseRoom";
import VideoPlayer from "../../../../../packages/components/VideoPlayer/VideoPlayer";

export default function ListUserRoom({ peers, peerId }: any) {
  return (
    <div>
      {Object.values(deleteKeyFromObject(peers, peerId)).map((item: any) => {
        if (!item.isCameraOn) return null;
        return (
          <div key={item.peerId}>
            <h1>{item.peerId}</h1>
            <VideoPlayer className="h-full w-full" stream={item.stream} />
          </div>
        );
      })}
    </div>
  );
}
