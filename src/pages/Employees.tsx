import { Edit, PlusCircle, RefreshCcw, Search, Trash, X } from "react-feather";
import { Link } from "react-router-dom";
import { Fragment, useState, useMemo } from "react";
//  @ts-ignore
import { useClickAway } from "@uidotdev/usehooks";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "react-query";
import { useDebounce } from "usehooks-ts";
import { collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";
import { firestore } from "../config/firebase";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

export default function Employees() {
  const [showSearch, setshowSearch] = useState(false);

  const ref: any = useClickAway(() => {
    setshowSearch(false);
  });

  const [show, setshow] = useState(10);

  const [searchValue, setsearchValue] = useState("");

  const debouncedValue = useDebounce<string>(searchValue, 500);

  const qk = useMemo(
    () => [
      "employeees",
      {
        search: debouncedValue,
        show,
      },
    ],
    [debouncedValue, show]
  );

  const fetchEmployees = async (e) => {
    const { search, show } = e.queryKey[1];

    const allEmployeeesFromFirebase: any = await getDocs(
      query(collection(firestore, "employees"))
    ).then((e) => {
      return e.docs.map((e) => {
        return {
          id: e.id,
          ...e.data(),
        };
      });
    });

    const res = allEmployeeesFromFirebase.filter((employeees: any) => {
      return (
        !search ||
        (employeees["names"]?.toLowerCase() || "").includes(
          search.toLowerCase()
        )
      );
    });
    return {
      total: res.length,
      results: res.slice(0, show),
    };
  };

  const { status, data, isFetching, error, refetch } = useQuery({
    queryFn: fetchEmployees,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    queryKey: qk,
    retry: false,
  });

  const clearFilters = () => {
    setsearchValue("");
    refetch();
  };

  const [deletingEmployee, setdeletingEmployee] = useState<any>();

  const handleDeleteEmployee = async (e) => {
    setdeletingEmployee(e.id);
    return await deleteDoc(doc(firestore, "employees", e.id))
      .then(() => {
        setdeletingEmployee(undefined);
        refetch();
      })
      .then(() => {
        setdeletingEmployee(undefined);
        refetch();
        toast.success("Employee deleted successfully");
      })
      .catch((e) => {
        setdeletingEmployee(undefined);
        toast.error(e.message);
      });
  };

  return (
    <Fragment>
      <div>
        <div className="flex items-center gap-3 justify-between">
          <div>
            <h4 className="text-blue-800 mb-1 text-xl font-semibold capitalize">
              {status === "loading" ? "---" : `${data?.total || 0} Employees`}
            </h4>
            <p className="text-[13.5px] font-medium text-gray-500">
              Total Employees available
            </p>
          </div>
          <div>
            <Link
              className="flex items-center gap-3 text-blue-800 font-semibold"
              to="/employees/new"
            >
              <PlusCircle size={"16px"} />
              <span className="text-sm">Add new Employees</span>
            </Link>
          </div>
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
              <span className="text-sm text-gray-700">All Employees</span>
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
            </div>
          </div>
          <div className="my-6">
            <div className="grid grid-cols-7">
              <div className="col-span-2 ">
                <a className="text-sm cursor-pointer flex items-center gap-2 font-medium text-gray-500 capitalize ">
                  <span>Name</span>
                </a>
              </div>
              <div className="flex col-span-2 items-center justify-start">
                <a className="text-sm cursor-pointer  flex items-center gap-2  font-medium text-gray-500 capitalize ">
                  <span>Created at</span>
                </a>
              </div>
              <div className="flex items-center justify-start">
                <a className="text-sm cursor-pointer  flex items-center gap-2  font-medium text-gray-500 capitalize ">
                  <span>role</span>
                </a>
              </div>
              <div className="flex items-center justify-start">
                <a className="text-sm cursor-pointer  flex items-center gap-2  font-medium text-gray-500 capitalize ">
                  <span>code</span>
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
                <div className="grid border cursor-pointer border-slate-200 rounded-md p-3 my-3 grid-cols-7">
                  <div className="flex  col-span-2 items-center gap-4">
                    <img
                      className="h-12 object-cover rounded-full border border-slate-300 w-12"
                      src={
                        e.photo ||
                        "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
                      }
                    />
                    <div>
                      <h4 className="text-[13.5px] mb-1 capitalize text-blue-800 font-semibold">
                        {e.names}
                      </h4>
                      <span className="text-[13px] capitalize text-gray-500 font-medium">
                        {e.role}
                      </span>
                    </div>
                  </div>
                  <div className="flex col-span-2 pr-7  gap-2 flex-col items-start justify-center">
                    <span className="text-sm leading-7 line-clamp-2 font-medium text-slate-500 capitalize">
                      {new Date(e.created_at?.toDate()).toLocaleDateString(
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
                  </div>
                  <div className="flex flex-col gap-2 items-start justify-center">
                    <span className="text-sm   leading-7 font-medium text-blue-800 capitalize">
                      {e.role || "Employee"}
                    </span>
                  </div>{" "}
                  <div className="flex  gap-2 flex-col items-start justify-center">
                    <span className="text-[13px] text-slate-600 font-medium">
                      {e.code}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 justify-end">
                    <Link
                      to={`/employees/${e.id}/edit`}
                      className="p-2 w-10 h-10 hover:bg-gray-200 cursor-pointer rounded-full  flex items-center justify-center"
                    >
                      <Edit className="text-blue-500 " size={18} />
                    </Link>
                    {deletingEmployee?.id === e.id ? (
                      <Loader />
                    ) : (
                      <a
                        className="p-2 w-10 h-10 hover:bg-gray-200 cursor-pointer rounded-full  flex items-center justify-center"
                        onClick={(i) => {
                          i.stopPropagation();
                          if (confirm("Are you sure you want to delete?")) {
                            handleDeleteEmployee(e);
                          }
                        }}
                      >
                        <Trash className="text-red-500 " size={18} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
          </div>

          {status === "success" && (
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
          )}
        </div>
      </div>
    </Fragment>
  );
}
