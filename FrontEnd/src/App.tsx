import "./App.css";
import { Route, Routes } from "react-router-dom";
import { protectedRoutes } from "./app-routers";
import DashBoardLayout from "./pages/DashBoardLayout/DashBoardLayout";
import Login from "./pages/Login/Login";
import { nanoid } from "nanoid";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<DashBoardLayout />} />
      {protectedRoutes.map((route) => {
        return (
          <Route key={nanoid()}>
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
