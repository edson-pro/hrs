import {
  Calendar,
  Check,
  Download,
  RefreshCcw,
  Search,
  X,
} from "react-feather";
import React, { Fragment, forwardRef, useState, useMemo, useRef } from "react";
//  @ts-ignore
import { useClickAway } from "@uidotdev/usehooks";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "react-query";
import { useDebounce } from "usehooks-ts";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../config/firebase";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import Avatar from "react-avatar";
import { useAuth } from "../context/authContext";
import ReactToPrint from "react-to-print";
import ReportToPrint from "../components/ReportToPrint";

const DateInput = forwardRef(({ value, onClick }: any, ref: any) => (
  <a
    onClick={onClick}
    ref={ref}
    className="flex items-center cursor-pointer gap-3 font-semibold"
  >
    <Calendar size={16} />
    <span className="text-[13.5px] text-gray-700">
      {value
        ? new Date(value).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "Choose date"}
    </span>
  </a>
));

export default function Orders() {
  const [showSearch, setshowSearch] = useState(false);

  const [sort, setsort] = useState<any>();

  const ref: any = useClickAway(() => {
    setshowSearch(false);
  });

  const [show, setshow] = useState(10);

  const [searchValue, setsearchValue] = useState("");

  const debouncedValue = useDebounce<string>(searchValue, 500);

  const [filterDate, setfilterDate] = useState<any>();

  const qk = useMemo(
    () => [
      "orders",
      {
        search: debouncedValue,
        sort,
        show,
        filterDate,
      },
    ],
    [debouncedValue, sort, show, filterDate]
  );

  const { user }: any = useAuth();

  const fetchOrders = async (e) => {
    const { filterDate, search, show } = e.queryKey[1];

    console.log(user.restorantId);
    const allOrdersFromFirebase: any = await getDocs(
      query(
        collection(firestore, "orders"),
        where("restorantId", "==", user.restorantId)
      )
    ).then((e) => {
      return e.docs.map((e) => {
        return {
          id: e.id,
          ...e.data(),
        };
      });
    });

    const res = allOrdersFromFirebase.filter((order: any) => {
      console.log(new Date(filterDate).toLocaleDateString());
      return (
        (!search ||
          (order["customer"].names?.toLowerCase() || "").includes(
            search.toLowerCase()
          )) &&
        (!filterDate ||
          new Date(order?.created_at.toDate()).toLocaleDateString() ===
            new Date(filterDate).toLocaleDateString())
      );
    });
    return {
      total: res.length,
      results: res.slice(0, show),
    };
  };

  const { status, data, isFetching, error, refetch } = useQuery({
    queryFn: fetchOrders,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    queryKey: qk,
    retry: false,
    enabled: Boolean(user?.restorantId),
  });

  const clearFilters = () => {
    setsearchValue("");
    setsort(undefined);
    refetch();
  };

  const [cancelingOrder, setcancelingOrder] = useState<any>();

  const [markingOrder, setmarkingOrder] = useState<any>();

  const handleMarkOrder = async (e) => {
    setmarkingOrder(e.id);
    return await updateDoc(doc(firestore, "orders", e.id), {
      status: "completed",
    })
      .then(() => {
        setmarkingOrder(undefined);
        refetch();
        toast.success("Order completed successfully");
      })
      .then(() => {})
      .catch((e) => {
        setmarkingOrder(undefined);
        toast.error(e.message);
      });
  };

  const handleCancelOrder = async (e) => {
    setcancelingOrder(e.id);
    return await updateDoc(doc(firestore, "orders", e.id), {
      status: "canceled",
    })
      .then(() => {
        setcancelingOrder(undefined);
        refetch();
        toast.success("Order Cancled successfully");
      })
      .then(() => {})
      .catch((e) => {
        setcancelingOrder(undefined);
        toast.error(e.message);
      });
  };

  const reportRef = useRef(null);
  return (
    <Fragment>
      <div>
        <div className="flex items-center gap-3 justify-between">
          <div>
            <h4 className="text-blue-800 mb-1 text-xl font-semibold capitalize">
              {status === "loading" ? "---" : `${data?.total || 0} Orders`}
            </h4>
            <p className="text-[13.5px] font-medium text-gray-500">
              Total orders available
            </p>
          </div>
          <div></div>
        </div>
        <div className="py-8">
          <div className="w-full border-b py-3 border-gray-300 flex items-center justify-between">
            <a
              onClick={clearFilters}
              className="flex cursor-pointer items-center gap-3 font-semibold"
            >
              <svg
                width="14"
                height="16"
                viewBox="0 0 14 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 17V7M13 17V1M1 17V13"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span className="text-sm text-gray-700">All Orders</span>
              {isFetching ? (
                <Loader />
              ) : (
                <a onClick={clearFilters} className="cursor-pointer">
                  <RefreshCcw size={16} />
                </a>
              )}
            </a>
            <div className="flex items-center gap-4">
              {showSearch ? (
                <div
                  ref={ref}
                  className="flex items-center bg-white px-4 pr-2 py-[6px] rounded-[3px]  gap-1 border border-gray-200"
                >
                  <input
                    type="text"
                    className="text-sm outline-none font-medium"
                    placeholder="Search here..."
                    onChange={(e) => setsearchValue(e.target.value)}
                    value={searchValue}
                  />
                  <a
                    onClick={() => {
                      setshowSearch(false);
                      setsearchValue("");
                    }}
                    className="cursor-pointer hover:bg-gray-200 rounded-full p-1"
                  >
                    <X size={16} className="text-slate-600" />
                  </a>
                </div>
              ) : (
                <a
                  onClick={() => {
                    setshowSearch(true);
                  }}
                  className="flex items-center  text-gray-700 hover:text-gray-800 cursor-pointer gap-3 font-semibold"
                >
                  <Search size={16} />
                  <span className="text-[13.5px]">Search</span>
                </a>
              )}
              <DatePicker
                selected={filterDate}
                onChange={(date) => setfilterDate(date)}
                customInput={<DateInput />}
              />
            </div>
          </div>
          <div className="my-6">
            <div className="grid grid-cols-9">
              <div className="col-span-2">
                <a className="text-sm cursor-pointer flex items-center gap-2 font-medium text-gray-500 capitalize ">
                  <span>Customer</span>
                </a>
              </div>
              <div className="flex col-span-2  items-center justify-start">
                <a className="text-sm cursor-pointer  flex items-center gap-2  font-medium text-gray-500 capitalize ">
                  <span>Menu</span>
                </a>
              </div>
              <div className="flex items-center col-span-2 justify-start">
                <a className="text-sm cursor-pointer  flex items-center gap-2  font-medium text-gray-500 capitalize ">
                  <span>Ordered At</span>
                </a>
              </div>
              <div className="flex items-center justify-start">
                <a className="text-sm cursor-pointer  flex items-center gap-2  font-medium text-gray-500 capitalize ">
                  <span>Price</span>
                </a>
              </div>

              <div className="flex items-center justify-start">
                <a className="text-sm cursor-pointer  flex items-center gap-2  font-medium text-gray-500 capitalize ">
                  <span>status</span>
                </a>
              </div>

              <div></div>
            </div>
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
            {status === "success" && data?.results?.length === 0 && (
              <div className="h-[300px] w-full flex items-center justify-center">
                <div>
                  <p className="text-gray-500 text-[13px] font-medium">
                    No results found
                  </p>
                </div>
              </div>
            )}

            {status === "success" &&
              data.results.map((e) => (
                <div
                  onClick={() => {
                    // open in new tab
                    window.open(`/orders/${e.id}`);
                  }}
                  className="grid border hover:bg-white hover:bg-opacity-50 cursor-pointer border-slate-200 rounded-md p-3 my-3 grid-cols-9"
                >
                  <div className="flex  col-span-2 items-center gap-4">
                    <Avatar
                      className="bg-slate-100"
                      size="40px"
                      round="100%"
                      name={e.customer?.names}
                      src={e.customer?.photo}
                    />
                    <div>
                      <h4 className="text-[13.5px] truncate mb-1 capitalize text-blue-800 font-semibold">
                        {e?.customer?.names}
                      </h4>
                      <span className="text-[13px] capitalize text-gray-500 font-medium">
                        Customer
                      </span>
                    </div>
                  </div>
                  <div className="flex col-span-2  pr-7  gap-2 flex-col items-start justify-center">
                    <span className="text-sm truncate leading-7 line-clamp-2 font-medium  text-blue-800 capitalize">
                      {e?.menu?.name}
                    </span>
                    <span className="text-[13px] capitalize text-gray-500 font-medium">
                      Menu
                    </span>
                  </div>

                  <div className="flex flex-col col-span-2 gap-2 items-start justify-center">
                    <span className="text-sm truncate leading-7 font-medium text-blue-800 capitalize">
                      {new Date(e.created_at.toDate()).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          minute: "numeric",
                          hour: "numeric",
                        }
                      )}
                    </span>
                    <span className="text-[13px] capitalize text-gray-500 font-medium">
                      Ordered at
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 items-start justify-center">
                    <span className="text-sm   leading-7 font-medium text-blue-800 capitalize">
                      {e?.amount} Frw
                    </span>
                    <span className="text-[13px] capitalize text-gray-500 font-medium">
                      Amount
                    </span>
                  </div>
                  <div className="flex  gap-2 flex-col items-start justify-center">
                    <span
                      className={`text-sm font-medium  px-4 py-[6px] rounded-md capitalize ${
                        e.status === "completed"
                          ? "text-green-500 bg-green-500 bg-opacity-25"
                          : e.status === "canceled"
                          ? "text-red-500 bg-red-500  bg-opacity-25"
                          : e.status === "pending"
                          ? "text-yellow-500 bg-yellow-500  bg-opacity-25"
                          : ""
                      }`}
                    >
                      {e.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 justify-end">
                    {e.status === "pending" && (
                      <Fragment>
                        {markingOrder?.id === e.id ? (
                          <Loader />
                        ) : (
                          <a
                            className="p-2 w-10 h-10 hover:bg-gray-200 cursor-pointer rounded-full  flex items-center justify-center"
                            onClick={(i) => {
                              i.stopPropagation();
                              if (confirm("Are you sure mark as completed?")) {
                                handleMarkOrder(e);
                              }
                            }}
                          >
                            <Check className="text-green-500 " size={18} />
                          </a>
                        )}

                        {cancelingOrder?.id === e.id ? (
                          <Loader />
                        ) : (
                          <a
                            className="p-2 w-10 h-10 hover:bg-gray-200 cursor-pointer rounded-full  flex items-center justify-center"
                            onClick={(i) => {
                              i.stopPropagation();
                              if (confirm("Are you sure you want to cancel?")) {
                                handleCancelOrder(e);
                              }
                            }}
                          >
                            <X className="text-red-500 " size={18} />
                          </a>
                        )}
                      </Fragment>
                    )}
                  </div>
                </div>
              ))}
          </div>

          {status === "success" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <ReactToPrint
                  trigger={() => {
                    return (
                      <a className="flex items-center  text-gray-700 hover:text-gray-800 cursor-pointer gap-3 font-semibold">
                        <Download size={16} />
                        <span className="text-[13.5px]">Generate Report</span>
                      </a>
                    );
                  }}
                  content={() => reportRef.current}
                />

                <div className="flex text-sm items-center gap-3 font-semibold">
                  <span className="text-blue-800">Total Revenue:</span>
                  <span>
                    {status === "success" &&
                      data?.results
                        .filter((e) => {
                          return e.status === "completed";
                        })
                        .reduce((a, b) => a + b.amount, 0)}
                    Frw
                  </span>
                </div>
              </div>
              <div className="flex justify-end items-center gap-4 w-full">
                <select
                  value={show}
                  onChange={(e) => {
                    setshow(parseInt(e.target.value));
                  }}
                  className="text-sm border border-slate-200 px-3 py-2 font-medium text-slate-600 rounded-md"
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                </select>
                <span className="font-medium text-sm text-slate-600">
                  Result: 1 - {show} of {data.total}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="hidden">
        <ReportToPrint
          restorantName={user.name}
          orders={data?.results || []}
          ref={reportRef}
        />
      </div>
    </Fragment>
  );
}
