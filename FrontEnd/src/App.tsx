import "./App.css";
import { Route, Routes } from "react-router-dom";
import { protectedRoutes } from "./app-routers";
import DashBoardLayout from "./pages/DashBoardLayout/DashBoardLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashBoardLayout />} />
      {protectedRoutes.map((route) => {
        return (
          <Route>
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
