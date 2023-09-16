import { Link, useLocation, useParams } from "react-router-dom";
import Logo from "./Logo";
import {
  File,
  GitPullRequest,
  Package,
  PieChart,
  Settings,
  Users,
} from "react-feather";
import { useAuth } from "../context/auth";

export default function Sidebar() {
  const { user } = useAuth();
  const userRole = user?.role;

  const links = [
    { title: "Dashboard", link: "/", icon: PieChart, roles: ["*"] },
    { title: "Employees", link: "/employeed", icon: Users, roles: ["*"] },
    {
      title: "Orders",
      link: "/orders",
      icon: Package,
      roles: ["*"],
    },
    { title: "Admins", link: "/admins", icon: Users, roles: ["manager"] },
    {
      title: "Requests",
      link: "/requests",
      icon: GitPullRequest,
      roles: ["manager"],
    },
    {
      title: "Transactions",
      link: "/transactions",
      icon: File,
      roles: ["manager"],
    },
  ];

  const location = useLocation();

  return (
    <aside className="h-screen z-50 border-r border-slate-200 fixed flex flex-col justify-between bg-gray-100 w-[280px]">
      <div>
        <div className="p-4">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div>
          <div className="py-1">
            <span className="font-medium px-4 text-slate-500 text-[13px] uppercase">
              Navigation
            </span>
          </div>
          <ul>
            {links
              .filter(
                (e) => e.roles.includes(userRole) || e.roles.includes("*")
              )
              .map((e, i) => {
                return (
                  <li key={i} className="relative">
                    <Link
                      className={`flex py-3 my-1 hover:text-blue-800 px-4 items-center gap-4 ${
                        location.pathname === e.link
                          ? "text-blue-800"
                          : "text-gray-700"
                      }`}
                      to={e.link}
                    >
                      <e.icon size={17} />
                      <span className="font-medium text-sm to-gray-700">
                        {e.title}
                      </span>
                    </Link>
                    {location.pathname === e.link && (
                      <span className="absolute top-0 bottom-0 right-0 w-1 bg-blue-800 rounded-l-full"></span>
                    )}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
      <div>
        <div className="p-4 pb-2">
          <img className="rounded-md" src="/images/money.jpg" alt="" />
        </div>
        <Link
          className="flex py-3 my-2 hover:text-blue-800 px-4 items-center gap-3"
          to={"/account"}
        >
          <Settings size={16} />
          <span className="font-medium text-sm to-gray-700">Settings</span>
        </Link>
      </div>
    </aside>
  );
}
