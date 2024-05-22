import { useEffect, useState } from "react";
import { ws } from "../../socketIO";
import Peer from "peerjs";
import { nanoid } from "nanoid";
import { useSetAtom } from "jotai";
import { peersAtom } from "../store/peer-store";

const useRoom = () => {
  const [me, setMe] = useState<Peer | undefined>();
  const [stream, setStream] = useState<MediaStream>();
  const setPeers = useSetAtom(peersAtom);

  useEffect(() => {
    const peer = new Peer(nanoid()); // Generate a unique peer ID
    setMe(peer);

    // navigator.mediaDevices
    //   .getUserMedia({ audio: true, video: true })
    //   .then((stream) => {
    //     setStream(stream);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // ws.on("get-users", ({ participants }: { participants: string[] }) => {
    //   console.log("Participants:", participants);
    // });
  }, []);

  useEffect(() => {
    if (!me || !stream) return;

    // ws.on("user-joined", ({ peerId }) => {
    //   const call = me.call(peerId, stream);
    //   call.on("stream", (peerStream) => {
    //     setPeers((prev: any) => ({
    //       ...prev,
    //       [peerId]: { stream: peerStream },
    //     }));
    //   });
    // });

    // me.on("call", (call) => {
    //   call.answer(stream);
    //   call.on("stream", (peerStream) => {
    //     setPeers((prev: any) => ({
    //       ...prev,
    //       [call.peer]: { stream: peerStream },
    //     }));
    //   });
    // });
  }, [me, stream, setPeers]);

  return { me, stream };
};

export default useRoom;
