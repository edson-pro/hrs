import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Archive,
  Coffee,
  Command,
  Grid,
  LogOut,
  Package,
  Users,
} from "react-feather";
import { useAuth } from "../context/authContext";
import authServices from "../services/auth.services";

export default function Sidebar() {
  const { user }: any = useAuth();
  const userRole = user?.role;

  const links = [
    {
      title: "Dashboard",
      link: "/",
      icon: Grid,
      roles: ["admin", "mtn-admin"],
    },
    {
      title: "Orders",
      link: "/orders",
      icon: Package,
      roles: ["admin", "mtn-admin"],
    },
    {
      title: "Restorants",
      link: "/restorants",
      icon: Coffee,
      roles: ["mtn-admin"],
    },
    {
      title: "Employees",
      link: "/employees",
      icon: Users,
      roles: ["mtn-admin"],
    },
    { title: "Food Menus", link: "/menus", icon: Archive, roles: ["admin"] },
    { title: "QR Code", link: "/qr-code", icon: Command, roles: ["admin"] },
  ];

  const location = useLocation();

  const navigate = useNavigate();

  const { logout } = useAuth();

  return (
    <aside className="h-screen z-50 border-r border-slate-200 fixed flex flex-col justify-between bg-[#FFCC00] w-[280px]">
      <div>
        <div className="mt-4">
          <Link to="/">
            <img
              className="h-10 ml-3 mb-1 w-12 rounded-md bg-cover"
              src="https://www.mtn.com/wp-content/uploads/2022/02/MTN_2022_Logo_Black_RGB-sml.jpg"
              alt=""
            />
          </Link>
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
                      className={`flex py-3 my-1 px-4 items-center gap-4 ${
                        location.pathname === e.link
                          ? "text-gray-800 bg-white bg-opacity-30"
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
                      <span className="absolute top-0 bottom-0 right-0 w-1 bg-white rounded-l-full"></span>
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
        <a
          className="flex py-3 my-2 cursor-pointer   px-4 items-center gap-3"
          onClick={() => {
            if (confirm("Are you sure you want to logout?")) {
              return authServices.logout().then(() => {
                navigate("/login");
                logout();
              });
            }
          }}
        >
          <LogOut size={16} />
          <span className="font-medium text-sm to-gray-700">Logout</span>
        </a>
      </div>
    </aside>
  );
}
