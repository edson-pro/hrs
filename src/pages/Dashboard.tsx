import { Fragment, forwardRef, useState, useMemo } from "react";
import { ArrowUpRight, Calendar, Check, CheckCircle } from "react-feather";
import DatePicker from "react-datepicker";
import { useQuery } from "react-query";

const DateInput = forwardRef(({ value, onClick }: any, ref: any) => (
  <a
    onClick={onClick}
    ref={ref}
    className="flex cursor-pointer items-center hover:bg-slate-100 px-3 py-1 rounded-md gap-3 font-semibold text-[13px]"
  >
    <Calendar size={15} />
    <span> {new Date(value).getFullYear()}</span>
  </a>
));
export default function Dashboard() {
  const [filterDate, setfilterDate] = useState<any>(new Date());

  const fetchAnalytics = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          employees: {
            value: "10",
            increased: true,
            percent: "+10%",
          },
          orders: {
            value: "100",
            increased: false,
            percent: "-10%",
          },
          menus: {
            value: "100",
            increased: true,
            percent: "+10%",
          },
        });
      }, 2000);
    });
  };

  const { data }: any = useQuery(
    [
      "analytics",
      {
        filterDate,
      },
    ],
    () => fetchAnalytics()
  );

  const cards = useMemo(
    () => [
      {
        title: "Employees",
        value: data ? data["employees"]?.value : "---",
        desc: "Total Employees",
      },
      {
        title: "Orders",
        value: data ? data["orders"]?.value : "---",
        desc: "Total orders",
      },
      {
        title: "Menu Items",
        value: data ? data["menus"]?.value : "---",
        desc: "Total menu items",
      },
    ],
    [data]
  );
  return (
    <Fragment>
      <div className="max-w-6xl mx-auto">
        <div>
          <h4 className="text-blue-800 mb-1 text-[18px] font-semibold capitalize">
            Welcome back edson, Good evening.
          </h4>
          <p className="text-[13.5px] font-medium text-gray-500">
            Here’s what’s happening with your business today.
          </p>
        </div>
        <div className="mt-4">
          <div className="border rounded-t-xl border-slate-300">
            <div className="flex items-center justify-between py-4 px-3">
              <h4 className="font-semibold text-[15px]">Restorant Overview</h4>
              <div>
                <DatePicker
                  selected={filterDate}
                  onChange={(date: any) => setfilterDate(date)}
                  customInput={<DateInput />}
                />
              </div>
            </div>
          </div>
          <div className="grid rounded-b-lg bg-[#F1F0F5] border-slate-300 border border-t-transparent grid-cols-3 gap-2">
            {cards.map((card, i) => {
              return (
                <div
                  key={i}
                  className="border-r p-3 last:border-r-0 border-slate-200"
                >
                  <div className="flex mb-5 items-center justify-between">
                    <h4 className="text-[13.5px] font-medium text-gray-500">
                      {card.title}
                    </h4>
                    <CheckCircle size={18} className="text-green-500" />
                  </div>
                  <div className="flex mt-2 items-end justify-between">
                    <div>
                      <p className="text-blue-800 mb-3 text-xl font-semibold capitalize">
                        {card.value}
                      </p>
                      <p className="text-blue-800 text-sm font-medium mt-2">
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
