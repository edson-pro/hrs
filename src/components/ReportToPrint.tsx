import React from "react";
import { useAuth } from "../context/authContext";

export const ReportToPrint = React.forwardRef(
  ({ orders, restorantName }: any, ref: any) => {
    return (
      <div className="px-3" ref={ref}>
        <div>
          <div className="text-center mt-8">
            <h1 className="text-base font-semibold">
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
          <table className="w-full mt-8 border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-sm font-semibold text-left">
                  Order Number
                </th>
                <th className="py-2 px-4 text-sm font-semibold text-left">
                  Customer
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
                    <td className="py-2 px-4 text-sm">{e.menu.name}</td>
                    <td className="py-2 px-4 text-sm">{e.amount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="text-right mt-4">
            <p className="font-semibold text-slate-900 text-[13px]">
              Total Amount: $250.00
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
