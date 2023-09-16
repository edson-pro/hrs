import Button from "../components/Button";

export default function Page404() {
  return (
    <div>
      {" "}
      <div>
        <div className="flex items-center justify-center flex-col gap-4 py-24">
          <div className="bg-red-200 border-[6px] border-red-100 h-16 w-16 rounded-full flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 text-red-500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M10.5 15L13.5 12M13.5 15L10.5 12"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                ></path>{" "}
                <path
                  d="M22 11.7979C22 9.16554 22 7.84935 21.2305 6.99383C21.1598 6.91514 21.0849 6.84024 21.0062 6.76946C20.1506 6 18.8345 6 16.2021 6H15.8284C14.6747 6 14.0979 6 13.5604 5.84678C13.2651 5.7626 12.9804 5.64471 12.7121 5.49543C12.2237 5.22367 11.8158 4.81578 11 4L10.4497 3.44975C10.1763 3.17633 10.0396 3.03961 9.89594 2.92051C9.27652 2.40704 8.51665 2.09229 7.71557 2.01738C7.52976 2 7.33642 2 6.94975 2C6.06722 2 5.62595 2 5.25839 2.06935C3.64031 2.37464 2.37464 3.64031 2.06935 5.25839C2 5.62595 2 6.06722 2 6.94975M21.9913 16C21.9554 18.4796 21.7715 19.8853 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V11"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                ></path>{" "}
              </g>
            </svg>
          </div>
          <div className="flex flex-col mt-2 gap-2 text-center">
            <h4 className="font-semibold text-base">
              OOPS 404 - Page not found
            </h4>
            <h4 className="font-medium text-slate-500 leading-7 text-sm">
              The page you are looking for might have been <br /> removed had
              its name.
            </h4>
            <div className="mt-3">
              <Button>Go Back Home</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
