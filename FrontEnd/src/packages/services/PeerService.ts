import { nanoid } from "nanoid";
import Peer from "peerjs";

export const usePeerService = () => {
  const peer = new Peer(nanoid());
  return {
    peer,
  };
};
