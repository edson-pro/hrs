/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "../Button";
import Avatar from "react-avatar";
import classNames from "classnames";

export default function ProfileModal({
  open,
  close,
  onEdit,
  isAbleToEdit,
  profile: profileeToShow,
}: any) {
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    if (profileeToShow) {
      setprofile(profileeToShow);
    }
  }, [profileeToShow]);

  const [profile, setprofile] = useState(profileeToShow);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={close}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg  text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full ">
              <div className="w-full bg-blue-700 h-[140px]"></div>
              <div className="flex -mt-8 flex-col justify-center items-center  gap-3">
                <Avatar
                  name={`${profile?.first_name} ${profile?.last_name}`}
                  round="100%"
                  size="70px"
                />
                <h4 className="text-base font-semibold ">
                  {profile?.first_name} {profile?.last_name}
                </h4>
                <p className="text-sm font-medium  capitalize text-gray-500 mb-2">
                  {profile?.role?.replace("-", " ")}
                </p>
                <span
                  className={`text-sm font-medium capitalize px-4 py-[6px] rounded-md bg-opacity-20 ${
                    profile?.status === "active"
                      ? "text-green-500 bg-green-500 bg-opacity-25"
                      : profile?.status === "blocked"
                      ? "text-red-500 bg-red-500  bg-opacity-25"
                      : profile?.status === "suspended"
                      ? "text-yellow-500 bg-yellow-500  bg-opacity-25"
                      : ""
                  }`}
                >
                  {profile?.status}
                </span>
              </div>
              <div className="max-w-sm my-4 mx-auto">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium text-gray-500">
                    Nationality:
                  </span>
                  <h4 className="text-[13.5px] font-semibold text-blue-900">
                    Rwanda
                  </h4>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium text-gray-500">
                    Full names:
                  </span>
                  <h4 className="text-[13.5px] font-semibold text-blue-900">
                    {profile?.first_name} {profile?.last_name}
                  </h4>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium text-gray-500">
                    Job Title:
                  </span>
                  <h4 className="text-[13.5px] font-semibold text-blue-900">
                    Developer
                  </h4>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium text-gray-500">
                    Phone number:
                  </span>
                  <h4 className="text-[13.5px] font-semibold text-blue-900">
                    {profile?.phone_number}
                  </h4>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium text-gray-500">
                    Location:
                  </span>
                  <h4 className="text-[13.5px] font-semibold text-blue-900">
                    {profile?.address}
                  </h4>
                </div>
              </div>
              <div
                className={classNames({
                  "mt-5 max-w-sm my-4 mx-auto flex items-center justify-between":
                    true,
                  "flex-col": !isAbleToEdit,
                })}
              >
                <Button
                  onClick={() => close()}
                  className="!text-blue-800  !w-auto !bg-gray-200"
                >
                  close
                </Button>
                {isAbleToEdit && (
                  <Button
                    className=" !w-auto"
                    onClick={() => {
                      onEdit(profile);
                      close();
                    }}
                  >
                    Edit
                  </Button>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
