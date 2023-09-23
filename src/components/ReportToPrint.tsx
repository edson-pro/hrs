import React from "react";

export const ReportToPrint = React.forwardRef(
  ({ orders, restorantName }: any, ref: any) => {
    return (
      <div className="px-3" ref={ref}>
        <div>
          <div className="text-center mt-8">
            <div className="flex items-center justify-center flex-col">
              <img
                className="h-10 ml-3 mb-1 w-12 rounded-md bg-cover"
                src="https://www.mtn.com/wp-content/uploads/2022/02/MTN_2022_Logo_Black_RGB-sml.jpg"
                alt=""
              />

              <h1 className="text-base capitalize font-semibold">
                {restorantName} - Order Report
              </h1>
              <p className="mt-2 text-sm text-slate-500 font-medium">
                Date:
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          <table className="w-full mt-8 border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-sm font-semibold text-left">
                  Order Number
                </th>
                <th className="py-2 px-4 text-sm font-semibold text-left">
                  Customer
                </th>{" "}
                <th className="py-2 px-4 text-sm font-semibold text-left">
                  Date
                </th>
                <th className="py-2 px-4 text-sm font-semibold text-left">
                  Menu
                </th>
                <th className="py-2 px-4 text-sm font-semibold text-left">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((e, index) => {
                return (
                  <tr>
                    <td className="py-2 px-4 text-sm">{index + 1}</td>
                    <td className="py-2 px-4 text-sm">{e.customer.names}</td>
                    <td className="py-2 px-4 text-sm">
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
                    </td>
                    <td className="py-2 px-4 text-sm">{e.menu.name}</td>
                    <td className="py-2 px-4 text-sm">{e.amount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div>
            {orders.length === 0 && (
              <p className="text-sm font-medium text-slate-600 text-center py-8">
                No report available for this restorant.
              </p>
            )}
          </div>
          <div className="text-right mt-4">
            <p className="font-semibold  text-slate-900 text-[13px]">
              Total Amount:{" "}
              {orders.reduce((a, b) => a + b.amount, 0).toFixed(2)} FRW
            </p>
          </div>
          <div className="mt-8 text-right">
            <p className="border-t text-slate-500 font-medium text-[13px] border-gray-200 pt-4">
              Authorized Signature
            </p>
          </div>
        </div>
      </div>
    );
  }
);

export default ReportToPrint;
