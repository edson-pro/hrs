import { useFormikContext } from "formik";

export default function Overview() {
  const { values }: any = useFormikContext();

  return (
    <div className="mb-12">
      <p className="text-[15px] font-medium leading-7 mb-5 text-gray-500">
        This Income and Expense Summary will help you track your spending and
        saving habits over time. You can see how much money you have coming in
        and going out each year, month, and week. You can also see how much you
        are giving away each month, week, and year.
      </p>
      <h4 className="text-base mb-3 font-semibold text-blue-800">
        Personal Information
      </h4>
      <div className="grid gap-6 grid-cols-6">
        <div className="col-span-4 ">
          <div className="bg-gray-100 p-3 rounded-md">
            <h4 className="text-[15px] font-semibold text-gray-700">
              Finance Information{" "}
            </h4>
            <div className="my-3">
              <div className="">
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-500">
                    Job title:{" "}
                    <b className="text-gray-700  font-semibold">
                      {values["job_title"]}
                    </b>
                  </p>
                  <p className="text-sm font-medium text-gray-500">
                    Job sector:{" "}
                    <b className="text-gray-700  font-semibold">
                      {values["job_sector"]}
                    </b>
                  </p>
                  <p className="text-sm font-medium text-gray-500">
                    More info:{" "}
                    <b className="text-gray-700 font-semibold">xxxxxxxxx</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="my-4 bg-gray-100 p-3 rounded-md">
            <h4 className="text-[15px] font-semibold text-gray-700">
              Income Information
            </h4>
            <div className="my-3">
              <div className="">
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-500">
                    Income name:{" "}
                    <b className="text-gray-700  font-semibold">
                      {values["income_name"]}
                    </b>
                  </p>
                  <p className="text-sm font-medium text-gray-500">
                    Job sector:{" "}
                    <b className="text-gray-700  font-semibold">it & support</b>
                  </p>
                  <p className="text-sm font-medium text-gray-500">
                    More info:{" "}
                    <b className="text-gray-700 font-semibold">
                      whatever you want whatever you want whatever you want
                    </b>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="my-4 bg-gray-100 p-3 rounded-md">
            <h4 className="text-[15px] font-semibold text-gray-700">
              Expenses Information
            </h4>
            <div className="my-3">
              <div className="">
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-500">
                    Job title:{" "}
                    <b className="text-gray-700  font-semibold">Developer</b>
                  </p>
                  <p className="text-sm font-medium text-gray-500">
                    Job sector:{" "}
                    <b className="text-gray-700  font-semibold">it & support</b>
                  </p>
                  <p className="text-sm font-medium text-gray-500">
                    More info:{" "}
                    <b className="text-gray-700 font-semibold">
                      whatever you want whatever you want whatever you want
                    </b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div>
            <h4 className="text-base mb-3 font-semibold text-gray-700">
              Profile Information
            </h4>
            <p className="text-sm font-medium leading-7 mb-5 text-gray-500">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galle.
            </p>
            <div className="capitalize flex gap-5 flex-col">
              <p className="text-sm flex gap-3 font-medium text-gray-500">
                <b className="text-gray-700  font-semibold"> First name:</b>
                {values["first_name"]}
              </p>
              <p className="text-sm flex gap-3 font-medium text-gray-500">
                <b className="text-gray-700  font-semibold">last name:</b>
                {values["last_name"]}
              </p>{" "}
              <p className="text-sm flex gap-3 font-medium text-gray-500">
                <b className="text-gray-700  font-semibold"> nationality:</b>
                {values["nationality"]}
              </p>{" "}
              <p className="text-sm flex gap-3 font-medium text-gray-500">
                <b className="text-gray-700  font-semibold"> province:</b>
                {values["province"]}
              </p>{" "}
              <p className="text-sm flex gap-3 font-medium text-gray-500">
                <b className="text-gray-700  font-semibold"> sector:</b>
                {values["sector"]}
              </p>{" "}
              <p className="text-sm flex gap-3 font-medium text-gray-500">
                <b className="text-gray-700  font-semibold">phone number:</b>
                {values["phone_number"]}
              </p>{" "}
              <p className="text-sm flex gap-3 font-medium text-gray-500">
                <b className="text-gray-700  font-semibold"> gender:</b>
                {values["gender"]}
              </p>
              <p className="text-sm flex gap-3 font-medium text-gray-500">
                <b className="text-gray-700  font-semibold">martial status:</b>
                {values["martial_status"]}
              </p>
            </div>
          </div>
        </div>
      </div>
      <table className="w-full mt-10">
        <tbody>
          {[1, 2].map((e, i) => {
            return (
              <tr key={i}>
                <td className="font-medium flex py-1 px-2 relative text-left">
                  <div className="h-[80%] w-[5px] bg-blue-800 z-0 absolute left-0 top-1"></div>
                  <span className="py-[10px] px-4 block text-sm font-medium text-gray-500">
                    Total Income
                  </span>
                </td>
                <td className="font-medium  py-1 text-left">
                  <span className="py-[10px] block text-sm font-medium text-gray-500">
                    500frw
                  </span>
                </td>
                <td className="font-medium  py-1 text-left">
                  <span className="py-[10px] block text-sm font-medium text-gray-500">
                    600frw
                  </span>
                </td>
                <td className="font-medium  py-1 text-left">
                  <span className="py-[10px] block text-sm font-medium text-gray-500">
                    700frw
                  </span>
                </td>
                <td className="font-medium  py-1 text-left">
                  <span className="py-[10px] block text-sm font-medium text-gray-500">
                    weekly
                  </span>
                </td>
              </tr>
            );
          })}
          <tr>
            <td className="font-medium border-t border-dashed border-gray-300 flex py-1 px-2 relative text-left">
              <div className="h-[80%] w-[5px] bg-green-500 z-0 absolute left-0 top-1"></div>
              <span className="py-[10px] font-bold px-4 block text-sm  text-gray-800">
                Free cash
              </span>
            </td>
            <td className="font-medium  border-t border-dashed border-gray-300  py-1 text-left">
              <span className="py-[10px] block text-sm font-medium text-gray-500">
                500frw
              </span>
            </td>
            <td className="font-medium  border-t border-dashed border-gray-300  py-1 text-left">
              <span className="py-[10px] block text-sm font-medium text-gray-500">
                600frw
              </span>
            </td>
            <td className="font-medium  border-t border-dashed border-gray-300  py-1 text-left">
              <span className="py-[10px] block text-sm font-medium text-gray-500">
                700frw
              </span>
            </td>
            <td className="font-medium  border-t border-dashed border-gray-300  py-1 text-left">
              <span className="py-[10px] block text-sm font-medium text-gray-500">
                weekly
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
