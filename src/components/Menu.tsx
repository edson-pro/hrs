import { Fragment } from "react";
//  @ts-ignore
import { useClickAway } from "@uidotdev/usehooks";

export default function Menu({ actions, className, close }: any) {
  const ref: any = useClickAway(() => {
    close(false);
  });

  return (
    <Fragment>
      <div
        ref={ref}
        className={`absolute z-40 right-0 bg-white top-12 shadow-md w-[220px] p-2 rounded-md border border-gray-200 ${className}`}
      >
        <ul>
          {actions.map((e: any) => {
            return (
              <li>
                <a
                  className="flex text-sm px-3  cursor-pointer py-2 my-1 rounded-md font-medium text-gray-600 acttions-center gap-3 hover:bg-gray-200"
                  onClick={() => {
                    e.click();
                    close();
                  }}
                >
                  <e.icon size={18} />
                  <span>{e.title}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </Fragment>
  );
}
