import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./dx-styles.scss";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SocketProvider } from "./packages/contexts/Socket.tsx";
import { PeerProvider } from "./packages/contexts/Peer.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchIntervalInBackground: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SocketProvider>
    {/* <PeerProvider> */}
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense>
          <App />
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
    {/* </PeerProvider> */}
  </SocketProvider>
);
