import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const PeerContext = createContext<any>(null);

export const usePeer = () => useContext(PeerContext);
export const PeerProvider = (props: any) => {
  const [remoteStream, setRemoteStream] = useState(null);
  const peer = useMemo(
    () =>
      new RTCPeerConnection({
        iceServers: [
          { urls: "stun:stun.services.mozilla.com" },
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:global.stun.twilio.com:3478" },
        ],
      }),
    []
  );

  const createOfferPeer = async () => {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    return offer;
  };

  const createAnswere = async (offer: any) => {
    (await peer.setRemoteDescription(offer)) as any;
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    return answer;
  };

  const setRemoteAns = async (offer: any) => {
    await peer.setRemoteDescription(offer);
  };
  const sendStream = async (stream: any) => {
    const tracks = stream.getTracks();
    for (const track of tracks) {
      peer.addTrack(track, stream);
    }
  };
  const handleTrachEvent = useCallback((ev: any) => {
    const streams = ev.streams;
    setRemoteStream(streams[0]);
  }, []);

  useEffect(() => {
    peer.addEventListener("track", handleTrachEvent);

    return () => {
      peer.removeEventListener("track", handleTrachEvent);
    };
  }, [handleTrachEvent, peer]);
  return (
    <PeerContext.Provider
      value={{
        peer,
        createOfferPeer,
        createAnswere,
        setRemoteAns,
        sendStream,
        remoteStream,
      }}>
      {props.children}
    </PeerContext.Provider>
  );
};
