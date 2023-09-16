/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "../Button";
import { api } from "@/lib/api";
import { toast } from "react-hot-toast";

export default function SuspendAccountModal({
  open,
  onClose,
  account,
  onSuspend,
}: any) {
  const cancelButtonRef = useRef(null);

  const [loading, setloading] = useState(false);

  const handleSuspend = async () => {
    setloading(true);
    try {
      await api.put(`/api/accounts/${account.id}`, {
        status: "suspended",
      });
      toast.success("Account suspended successfully");
      setloading(false);
      onClose();
      onSuspend();
    } catch (e) {
      setloading(false);
      console.log(e);
      toast.error(e?.response?.data?.message || e?.message);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={onClose}
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
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full ">
                  <svg
                    width="88"
                    height="67"
                    viewBox="0 0 88 67"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M73.603 66.9805L17.8344 67C15.0327 67.001 12.523 65.5364 11.1214 63.0823C10.4204 61.8551 10.0699 60.5089 10.0694 59.1624C10.069 57.8161 10.4188 56.4695 11.1187 55.242L38.9853 3.9224C40.3854 1.46719 42.8941 0.000980542 45.6958 4.91594e-07C48.4975 -0.000979558 51.0071 1.46348 52.409 3.91771L80.3142 55.2242C81.0133 56.4481 81.363 57.7927 81.3631 59.1384C81.363 60.484 81.0134 61.8304 80.3133 63.0581C78.9133 65.5131 76.4047 66.9795 73.603 66.9805ZM10.7704 59.1615C10.7704 60.387 16.9242 57.7462 17.5618 58.8625C18.837 61.0951 15.2852 66.2933 17.8341 66.2924C17.8341 66.2924 78.4338 64.938 79.7075 62.7045C80.3442 61.5877 80.6625 60.3626 80.6621 59.1377C80.6617 57.9129 80.3426 56.6881 79.7049 55.5718L51.7996 4.26534C50.5279 2.0391 48.2449 0.706726 45.696 0.707618C43.1483 0.70851 10.7705 57.9358 10.7704 59.1615Z"
                      fill="#3F3D56"
                    />
                    <path
                      d="M61.9689 55.6627C76.0693 55.6627 87.5 44.0991 87.5 29.8346C87.5 15.5702 76.0693 4.00661 61.9689 4.00661C47.8685 4.00661 36.4378 15.5702 36.4378 29.8346C36.4378 44.0991 47.8685 55.6627 61.9689 55.6627Z"
                      fill="#EEBF36"
                    />
                    <path
                      d="M61.9735 45.6676C63.2682 45.6676 64.3177 44.6058 64.3177 43.2961C64.3177 41.9864 63.2682 40.9247 61.9735 40.9247C60.6789 40.9247 59.6293 41.9864 59.6293 43.2961C59.6293 44.6058 60.6789 45.6676 61.9735 45.6676Z"
                      fill="white"
                    />
                    <path
                      d="M61.9635 14.0017C61.7482 15.4492 62.134 15.7521 62.1361 21.9925C62.1383 28.2329 63.4182 36.5998 61.9712 36.6003C60.5243 36.6008 59.995 19.3334 54.9705 17.8052C49.0631 16.0084 62.6606 9.31586 61.9635 14.0017Z"
                      fill="white"
                    />
                    <path
                      d="M27.7026 43.0213L25.3959 47.9518C28.1845 45.9289 32.5401 44.1851 36.0062 43.2512C32.7767 41.6731 28.8249 39.1286 26.464 36.6095L27.7908 41.8191C12.2364 38.6141 1.06658 26.5429 1.06185 12.7151L0.5 12.5195C0.504938 26.963 11.5202 39.7491 27.7026 43.0213Z"
                      fill="#3F3D56"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-base leading-6 font-semibold text-gray-8"
                  >
                    Are you sure
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm leading-7 text-gray-500">
                      Are you sure you want to suspend this account? Suspending
                      an account is like pausing it, which means the user will
                      not be able to do anything with it.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex mt-4 items-center justify-between gap-2">
                <Button
                  onClick={onClose}
                  className="!text-blue-800 !w-auto !bg-gray-200"
                >
                  Cancel
                </Button>

                <Button
                  loading={loading}
                  className="!text-white  !w-auto !bg-[#EEBF36]"
                  onClick={handleSuspend}
                >
                  Suspend
                </Button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
