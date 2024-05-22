import { atom, useSetAtom } from "jotai";

export const peerStreamsAtom = atom({});
export const peerNamesAtom = atom({});
export const allPeersAtom = atom({});
export const peersAtom = atom<any>({});

// export const addPeerStreamAction = (peerId: any, stream: any) => {
//   const setPeerStreams = useSetAtom(peerStreamsAtom);
//   setPeerStreams((prev) => ({ ...prev, [peerId]: stream }));
// };

// export const addPeerNameAction = (peerId: any, userName: any) => {
//   const setPeerNames = useSetAtom(peerNamesAtom);
//   setPeerNames((prev) => ({ ...prev, [peerId]: userName }));
// };

// export const removePeerStreamAction = (peerId: any) => {
//   const setPeerStreams = useSetAtom(peerStreamsAtom);
//   setPeerStreams((prev) => {
//     const { [peerId]: omit, ...rest } = prev;
//     return rest;
//   });
// };

// export const addAllPeersAction = (peers) => {
//   const setAllPeers = useSetAtom(allPeersAtom);
//   setAllPeers(() => peers);
// };
