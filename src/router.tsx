import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Page404 from "./pages/Page404";
import { ProtectedRoute } from "./components/ProtectRoute";
import Login from "./pages/Login";
import App from "./App";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Menus from "./pages/Menus";
import QrCode from "./pages/QrCode";
import CreateMenu from "./pages/CreateMenu";
import EditMenu from "./pages/EditMenu";
import NewOrder from "./pages/NewOrder";
import OrderDetails from "./pages/OrderDetails";
import Employees from "./pages/Employees";
import CreateEmployee from "./pages/CreateEmployee";
import EditEmployee from "./pages/EditEmployee";
import Restorants from "./pages/Restorants";
import CreateRestorant from "./pages/CreateRestorant";
import EditRestorant from "./pages/EditRestorant";

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
            path: "orders",
            element: (
              <ProtectedRoute roles={["admin", "mtn-admin"]}>
                <Orders />
              </ProtectedRoute>
            ),
          },
          {
            path: "restorants",
            element: (
              <ProtectedRoute roles={["mtn-admin"]}>
                <Restorants />
              </ProtectedRoute>
            ),
          },
          {
            path: "restorants/new",
            element: (
              <ProtectedRoute roles={["mtn-admin"]}>
                <CreateRestorant />
              </ProtectedRoute>
            ),
          },
          {
            path: "restorants/:id/edit",
            element: (
              <ProtectedRoute roles={["mtn-admin"]}>
                <EditRestorant />
              </ProtectedRoute>
            ),
          },
          {
            path: "menus",
            element: (
              <ProtectedRoute roles={["admin"]}>
                <Menus />
              </ProtectedRoute>
            ),
          },
          {
            path: "employees",
            element: (
              <ProtectedRoute roles={["mtn-admin"]}>
                <Employees />
              </ProtectedRoute>
            ),
          },
          {
            path: "employees/new",
            element: (
              <ProtectedRoute roles={["mtn-admin"]}>
                <CreateEmployee />
              </ProtectedRoute>
            ),
          },
          {
            path: "employees/:id/edit",
            element: (
              <ProtectedRoute roles={["mtn-admin"]}>
                <EditEmployee />
              </ProtectedRoute>
            ),
          },
          {
            path: "menus/new",
            element: (
              <ProtectedRoute roles={["admin"]}>
                <CreateMenu />
              </ProtectedRoute>
            ),
          },
          {
            path: "menus/:id/edit",
            element: (
              <ProtectedRoute roles={["admin"]}>
                <EditMenu />
              </ProtectedRoute>
            ),
          },
          {
            path: "qr-code",
            element: (
              <ProtectedRoute roles={["admin"]}>
                <QrCode />
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
        path: "new-order",
        element: <NewOrder />,
      },
      {
        path: "orders/:id",
        element: <OrderDetails />,
      },

      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
