import "./App.css";
import { Route, Routes } from "react-router-dom";
import { protectedRoutes } from "./app-routers";
import Login from "./pages/Login/Login";
import { nanoid } from "nanoid";
import UserDasboard from "./pages/PageUser/UserDasboard/UserDasboard";
import Register from "./pages/Login/Register";
import VerifyEmail from "./pages/Login/VerifyEmail";
import { useEffect, useLayoutEffect } from "react";
import { useConfigAPI } from "./packages/api/config-api";
import { useSetAtom } from "jotai";
import { profileStoreAtom } from "./packages/store/permission-store";
import { showErrorAtom } from "./packages/ui/Error/error-store";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/" element={<UserDasboard />} />
      {protectedRoutes.map((route) => {
        return (
          <Route
            key={nanoid()}
            path={`${route.path}`}
            element={route.getPageElement?.()}>
            {route.children &&
              route.children.length > 0 &&
              route.children.map((child) => {
                return (
                  <Route
                    key={child.key}
                    path={`${child.path}`}
                    element={child.getPageElement?.()}
                  />
                );
              })}
          </Route>
        );
      })}
      <Route
        path={"*"}
        element={
          <>
            <div>Page not found</div>
          </>
        }
      />
    </Routes>
  );
}

export default App;
