import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Page404 from "./pages/Page404";
import { ProtectedRoute } from "./components/ProtectRoute";
import Login from "./pages/Login";
import App from "./App";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/",
            element: (
              <ProtectedRoute roles={["*"]}>
                <Dashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: "accounts",
            element: (
              <ProtectedRoute roles={["*"]}>
                <Employees />
              </ProtectedRoute>
            ),
          },

          {
            path: "*",
            element: <Page404 />,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
