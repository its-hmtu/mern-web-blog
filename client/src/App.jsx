import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RouteList } from "./routes";

const App = () => {
  const routeList = RouteList();
  const router = createBrowserRouter([...routeList])

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default App;
