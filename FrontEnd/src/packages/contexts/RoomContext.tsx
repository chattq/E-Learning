import { ReactNode, createContext, useEffect, useState } from "react";
import Peer from "peerjs";
import { getProfileFromLS } from "../../utils/localStorageHandler";
import { ws } from "../../socketIO";
import { useParams } from "react-router-dom";
import { peersAtom } from "../store/peer-store";
import { nanoid } from "nanoid";
import { useAtom, useSetAtom } from "jotai";

interface RoomContextProps {
  me: Peer | undefined;
}

export const RoomContext = createContext<RoomContextProps | any>(undefined);

interface RoomProviderProps {
  children: ReactNode;
}

export const RoomProvider: React.FC<RoomProviderProps> = ({
  children,
}: any) => {
  const [me, setMe] = useState<Peer | undefined>();
  const [stream, setStream] = useState<MediaStream>();
  // const [peers, setPeers] = useState<any>({});
  const setPeers = useSetAtom(peersAtom);

  const getUsers = ({ participants }: { participants: string[] }) => {
    console.log(24, participants);
  };

  useEffect(() => {
    // const profileUser = getProfileFromLS();

    // const peer = new Peer(profileUser.id.replace(/[^a-zA-Z0-9]/g, "")); // lấy ra id peer của user
    const peer = new Peer(nanoid()); // lấy ra id peer của user
    setMe(peer);
    // console.log(36, peer);

    try {
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then((stream) => {
          setStream(stream);
          // console.log(43, strem);
        });
    } catch (err) {
      console.log(err);
    }

    ws.on("get-users", getUsers);
  }, []);

  useEffect(() => {
    if (!me) return;
    if (!stream) return;
    ws.on("user-joined", ({ peerId }) => {
      console.log("56,peerId", { peerId });
      const call = me.call(peerId, stream);
      call.on("stream", (peerStream) => {
        console.log("peerId", peerId);
        console.log("peerStream", peerStream);
        setPeers((prev: any) => ({
          ...prev,
          [peerId]: {
            stream: peerStream,
          },
        }));
      });
    });

    me.on("call", (call) => {
      call.answer(stream);
      call.on("stream", (peerStream) => {
        console.log("call.peer", call.peer);
        console.log("peerStream", peerStream);
        setPeers((prev: any) => ({
          ...prev,
          [call.peer]: { stream: peerStream },
        }));
      });
    });
  }, [me, stream]);

  // console.log("peers", { peers });

  return (
    <RoomContext.Provider value={{ me, stream }}>
      {children}
    </RoomContext.Provider>
  );
};
