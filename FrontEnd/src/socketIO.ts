import { io } from "socket.io-client";

export const ws = io(`${import.meta.env.VITE_API_DOMAINBE}`);
