import { doc, getDoc } from "firebase/firestore";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { firestore } from "../config/firebase";
import Loader from "../components/Loader";
import { useState } from "react";

export default function OrderDetails() {
  const params = useParams();

  const id = params?.id;

  const { status, data, error }: any = useQuery({
    queryFn: () =>
      getDoc(doc(firestore, "orders", id)).then((res) => {
        return {
          ...res.data(),
          id: res.id,
        };
      }),
    keepPreviousData: true,
    queryKey: ["menus", id],
    retry: 1,
  });

  const [menu, setmenu] = useState(false);
  return (
    <div className="px-3">
      {" "}
      <div
        className={`bg-white max-w-xl border border-t-4 border-t-yellow-400  my-12 mx-auto p-2 rounded-md`}
      >
        <div>
          {status === "loading" && (
            <div className="h-[300px] w-full flex items-center justify-center">
              <Loader />
            </div>
          )}
          {status === "error" && (
            <div className="h-[300px] w-full flex items-center justify-center">
              <div className="text-gray-500 text-[13px] font-medium">
                {error["message"]}
              </div>
            </div>
          )}
          {status === "success" && !data && (
            <div className="h-[300px] w-full flex items-center justify-center">
              <div>
                <p className="text-gray-500 text-[13px] font-medium">
                  No order found
                </p>
              </div>
            </div>
          )}
        </div>

        {status === "success" && data && (
          <div>
            <div className="flex items-center justify-center gap-2 flex-col">
              <img
                className="rounded-full w-20 object-cover h-20"
                src={data.customer.photo}
                alt=""
              />
              <h4 className="text-slate-900 mt-2 font-semibold capitalize">
                {data.customer.names}
              </h4>
              <span className="capitalize text-slate-500 text-sm font-medium">
                {data.customer.role || "Employee"}
              </span>
            </div>
            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink uppercase font-semibold text-[13px] mx-4 text-slate-500">
                Your order details
              </span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>
            <div
              key={data?.id}
              className="flex px-1 flex-col items-center justify-between last:border-b-0 border-b border-slate-200 py-2"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <img
                  className="rounded-md w-36 border bg-slate-300 object-cover h-32"
                  src={data.menu?.image}
                  alt=""
                />
                <div className="space-y-1">
                  <h4 className="text-slate-900 text-sm font-semibold capitalize">
                    {data.menu?.name}
                  </h4>
                  <div className="space-y-3 flex flex-col">
                    <span className="capitalize leading-7 text-slate-500 text-sm font-medium">
                      {data.menu.description}
                    </span>
                    <span className="capitalize  leading-6 text-slate-500 text-sm font-medium">
                      <span className="text-sm font-semibold text-blue-700">
                        Ingredients:
                      </span>{" "}
                      {data.menu.ingredients.join(", ")}
                    </span>
                    <span className="capitalize  leading-6 text-slate-500 text-sm font-medium">
                      <span className="text-sm font-semibold text-blue-700">
                        Ordered at:
                      </span>{" "}
                      {new Date(data.created_at.toDate()).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          minute: "numeric",
                          hour: "numeric",
                        }
                      )}{" "}
                    </span>
                    <span className="capitalize  leading-6 text-slate-500 text-sm font-medium">
                      <span className="text-sm font-semibold text-blue-700">
                        Amount:
                      </span>{" "}
                      {data.amount} Frw
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="flex mt-3 gap-2 flex-col items-center justify-center">
                      <span
                        className={`text-sm font-medium  px-4 py-[6px] rounded-md capitalize ${
                          data.status === "completed"
                            ? "text-green-500 bg-green-500 bg-opacity-25"
                            : data.status === "canceled"
                            ? "text-red-500 bg-red-500  bg-opacity-25"
                            : data.status === "pending"
                            ? "text-yellow-500 bg-yellow-500  bg-opacity-25"
                            : ""
                        }`}
                      >
                        {data.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
