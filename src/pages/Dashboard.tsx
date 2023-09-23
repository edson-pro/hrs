import { Fragment, useMemo } from "react";
import { CheckCircle } from "react-feather";
import { useQuery } from "react-query";
import { useAuth } from "../context/authContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../config/firebase";

export default function Dashboard() {
  const fetchAnalytics = async () => {
    const queryF =
      user.role === "mtn-admin"
        ? collection(firestore, "orders")
        : query(
            collection(firestore, "orders"),
            where("restorantId", "==", user.restorantId)
          );
    const [
      ordersCountFromFirestore,
      menusCountFromFirestore,
      employeesCountFromFirestore,
      restorantsCountFromFirestore,
    ] = await Promise.all([
      getDocs(queryF),
      getDocs(
        query(
          collection(firestore, "menus"),
          where("restorantId", "==", user?.restorantId)
        )
      ),
      getDocs(collection(firestore, "employees")),
      getDocs(collection(firestore, "restorants")),
    ]);
    return {
      orders: {
        value: ordersCountFromFirestore.size,
      },
      menus: {
        value: menusCountFromFirestore.size,
      },
      employees: {
        value: employeesCountFromFirestore.size,
      },
      restorants: {
        value: restorantsCountFromFirestore.size,
      },
    };
  };

  const { data }: any = useQuery(["analytics"], () => fetchAnalytics());

  const cards = useMemo(
    () => [
      {
        title: "Orders",
        value: data ? data["orders"]?.value : "---",
        desc: "Total orders",
        role: ["admin", "mtn-admin"],
      },
      {
        title: "Menu Items",
        value: data ? data["menus"]?.value : "---",
        desc: "Total menu items",
        role: ["admin"],
      },
      {
        title: "Employees",
        value: data ? data["employees"]?.value : "---",
        desc: "Total Employees",
        role: ["mtn-admin"],
      },
      {
        title: "Restorants",
        value: data ? data["restorants"]?.value : "---",
        desc: "Total Restorants",
        role: ["mtn-admin"],
      },
    ],
    [data]
  );
  const { user }: any = useAuth();

  const getGreetings = () => {
    const hours = new Date().getHours();
    if (hours < 12) {
      return "Good morning";
    } else if (hours < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  return (
    <Fragment>
      <div className="max-w-6xl mx-auto">
        <div>
          <h4 className="text-yellow-500 mb-1 text-[18px] font-semibold capitalize">
            Welcome back{" "}
            {user.role === "mtn-admin" ? "Human resource" : user?.username},
            {getGreetings()}.
          </h4>
          <p className="text-[13.5px] font-medium text-gray-500">
            Here’s what’s happening with your business today.
          </p>
        </div>
        <div className="mt-4">
          <div className="border bg-white rounded-t-xl border-slate-300">
            <div className="flex items-center justify-between py-4 px-3">
              <h4 className="font-semibold text-[15px]">
                Mtn Dashboard Overview
              </h4>
            </div>
          </div>
          <div
            className={`grid rounded-b-lg bg-white border-slate-300 border border-t-transparent ${
              user.role === "mtn-admin" ? "grid-cols-3" : "grid-cols-2"
            } gap-2`}
          >
            {cards
              .filter((e) => {
                return e.role.includes(user?.role);
              })
              .map((card, i) => {
                return (
                  <div
                    key={i}
                    className={`border-r p-3 last:border-r-0 border-slate-200`}
                  >
                    <div className="flex mb-5 items-center justify-between">
                      <h4 className="text-[13.5px] font-medium text-gray-500">
                        {card.title}
                      </h4>
                      <CheckCircle size={18} className="text-green-500" />
                    </div>
                    <div className="flex mt-2 items-end justify-between">
                      <div>
                        <p className="text-yellow-500 mb-3 text-xl font-semibold capitalize">
                          {card.value}
                        </p>
                        <p className="text-yellow-500 text-sm font-medium mt-2">
                          {card.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
