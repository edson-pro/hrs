import { Fragment } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Layout() {
  const { user, loading } = useAuth();

  if (!user && loading) {
    return (
      <div className=" w-screen h-screen flex items-center justify-center flex-col gap-8">
        {/* <Logo /> */}
        <div className="w-[150px]">
          <div className="w-full m-auto">
            <div className="progress-bar h-1 bg-yellow-200 w-full overflow-hidden">
              <div className="progress-bar-value w-full h-full bg-yellow-500 " />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (user && !loading) {
    return (
      <Fragment>
        <Sidebar />
        <Navbar />
        <div className="pl-[280px] pt-16">
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </Fragment>
    );
  }

  if (!user && !loading) {
    return <Navigate to={"/login"} />;
  }
}
