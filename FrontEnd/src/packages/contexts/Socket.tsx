import { createContext, useContext, useMemo } from "react";
import { io } from "socket.io-client";

const SocketConext = createContext<any>(null);

export const useSocket = () => {
  const socket = useContext(SocketConext);
  return socket;
};
export const SocketProvider = (props: any) => {
  const socket = useMemo(() => io("http://localhost:4000"), []);
  return (
    <SocketConext.Provider value={socket}>
      {props.children}
    </SocketConext.Provider>
  );
};
