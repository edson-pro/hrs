import Avatar from "react-avatar";
import { LogOut } from "react-feather";
//  @ts-ignore
import { useClickAway } from "@uidotdev/usehooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import authServices from "../services/auth.services";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const ref: any = useClickAway(() => {
    setIsOpen(false);
  });

  const { user, loading, logout }: any = useAuth();

  const navigate = useNavigate();
  return (
    <nav className="w-full z-40 fixed border-b bg-white border-slate-200">
      <div className="pl-[280px]">
        <div className="px-7 flex py-2 items-center  justify-between">
          <div>
            <div className="flex items-start gap-[6px] flex-col">
              <h4 className="font-semibold text-[14.5px]">Dashboard</h4>
              <p className="text-[13.5px] font-medium text-gray-500">
                Good evening, {user?.username}
              </p>
            </div>
          </div>
          <div className="relative">
            {loading ? (
              <div className="h-11 w-11 bg-slate-200 rounded-full animate-pulse"></div>
            ) : (
              <a
                className="cursor-pointer"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                <Avatar size="40px" round="100%" name={user?.username} />
              </a>
            )}

            {isOpen && (
              <div
                ref={ref}
                className="absolute right-0 bg-white top-12 shadow-md w-[220px] p-2 rounded-md border border-gray-200"
              >
                <ul>
                  <li>
                    <a
                      className="flex text-sm px-3  cursor-pointer rounded-md py-2 my-1 font-medium text-gray-600 items-center gap-3 hover:bg-gray-200"
                      onClick={() => {
                        if (confirm("Are you sure you want to logout?")) {
                          return authServices.logout().then(() => {
                            navigate("/login");
                            logout();
                          });
                        }
                      }}
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
